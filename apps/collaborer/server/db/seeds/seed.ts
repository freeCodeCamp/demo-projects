import { db } from '../../src/db/index.js';
import { hashPassword } from '../../src/utils/password.js';

const now = () => new Date().toISOString();

function insertUser(
  email: string,
  username: string,
  name: string,
  password: string
) {
  return db
    .prepare(
      'INSERT INTO users (email, username, password_hash, name) VALUES (?, ?, ?, ?)'
    )
    .run(email, username, hashPassword(password), name)
    .lastInsertRowid as number;
}

function insertOrganization(
  name: string,
  description: string,
  ownerId: number
) {
  return db
    .prepare(
      'INSERT INTO organizations (name, description, owner_id) VALUES (?, ?, ?)'
    )
    .run(name, description, ownerId).lastInsertRowid as number;
}

function addOrganizationMember(
  organizationId: number,
  userId: number,
  role: 'owner' | 'admin' | 'member'
) {
  db.prepare(
    'INSERT INTO organization_members (organization_id, user_id, role) VALUES (?, ?, ?)'
  ).run(organizationId, userId, role);
}

function insertProject(
  organizationId: number,
  name: string,
  description: string,
  status: string,
  createdBy: number
) {
  return db
    .prepare(
      'INSERT INTO projects (organization_id, name, description, status, created_by) VALUES (?, ?, ?, ?, ?)'
    )
    .run(organizationId, name, description, status, createdBy)
    .lastInsertRowid as number;
}

function addProjectMember(projectId: number, userId: number) {
  db.prepare(
    'INSERT INTO project_members (project_id, user_id) VALUES (?, ?)'
  ).run(projectId, userId);
}

function insertTask(
  projectId: number,
  title: string,
  status: string,
  priority: string,
  assigneeId: number | null,
  creatorId: number,
  dueDate: string | null
) {
  return db
    .prepare(
      `INSERT INTO tasks (project_id, title, status, priority, assignee_id, creator_id, due_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(projectId, title, status, priority, assigneeId, creatorId, dueDate)
    .lastInsertRowid as number;
}

function seed(): void {
  const clearTables = [
    'activities',
    'notifications',
    'attachments',
    'comments',
    'task_labels',
    'labels',
    'subtasks',
    'tasks',
    'project_members',
    'projects',
    'invitations',
    'organization_members',
    'organizations',
    'users'
  ];

  db.transaction(() => {
    for (const table of clearTables) {
      db.exec(`DELETE FROM ${table}`);
    }

    // --- Users ---
    const alice = insertUser(
      'alice@example.com',
      'alice',
      'Alice Nakamura',
      'password123'
    );
    const bob = insertUser(
      'bob@example.com',
      'bob',
      'Bob Fischer',
      'password123'
    );
    const carol = insertUser(
      'carol@example.com',
      'carol',
      'Carol Weber',
      'password123'
    );
    const dana = insertUser(
      'dana@example.com',
      'dana',
      'Dana Osei',
      'password123'
    );

    // --- Organizations (Alice belongs to both, demonstrating org switching) ---
    const acme = insertOrganization(
      'Acme Robotics',
      'Building the next generation of warehouse robots.',
      alice
    );
    addOrganizationMember(acme, alice, 'owner');
    addOrganizationMember(acme, bob, 'admin');
    addOrganizationMember(acme, carol, 'member');

    const nimbus = insertOrganization(
      'Nimbus Studio',
      'A small studio shipping a mobile app.',
      dana
    );
    addOrganizationMember(nimbus, dana, 'owner');
    addOrganizationMember(nimbus, alice, 'member');

    // --- Projects ---
    const website = insertProject(
      acme,
      'Website Redesign',
      'Refresh the marketing site.',
      'active',
      alice
    );
    addProjectMember(website, alice);
    addProjectMember(website, bob);
    addProjectMember(website, carol);

    const mobileApp = insertProject(
      nimbus,
      'Mobile App Launch',
      'Ship v1 of the companion app.',
      'planning',
      dana
    );
    addProjectMember(mobileApp, dana);
    addProjectMember(mobileApp, alice);

    // --- Labels ---
    const bugLabel = db
      .prepare('INSERT INTO labels (project_id, name, color) VALUES (?, ?, ?)')
      .run(website, 'bug', '#ef4444').lastInsertRowid as number;
    const designLabel = db
      .prepare('INSERT INTO labels (project_id, name, color) VALUES (?, ?, ?)')
      .run(website, 'design', '#8b5cf6').lastInsertRowid as number;

    // --- Tasks ---
    const inFiveDays = new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ).toISOString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const homepageTask = insertTask(
      website,
      'Design new homepage hero',
      'in_progress',
      'high',
      carol,
      alice,
      inFiveDays
    );
    db.prepare('INSERT INTO task_labels (task_id, label_id) VALUES (?, ?)').run(
      homepageTask,
      designLabel
    );

    const navBugTask = insertTask(
      website,
      'Fix broken nav on mobile',
      'todo',
      'urgent',
      bob,
      alice,
      yesterday
    );
    db.prepare('INSERT INTO task_labels (task_id, label_id) VALUES (?, ?)').run(
      navBugTask,
      bugLabel
    );

    insertTask(
      website,
      'Write copy for pricing page',
      'backlog',
      'medium',
      null,
      alice,
      null
    );
    insertTask(website, 'Set up analytics', 'done', 'low', bob, alice, null);

    // Extra Website Redesign tasks — a fuller, more realistic spread across
    // every status/priority so the Analytics page has real variety to show.
    insertTask(
      website,
      'Audit existing page load times',
      'backlog',
      'medium',
      null,
      alice,
      null
    );
    insertTask(
      website,
      'Draft sitemap for new IA',
      'backlog',
      'low',
      carol,
      alice,
      null
    );
    insertTask(
      website,
      'Collect competitor screenshots',
      'backlog',
      'low',
      null,
      bob,
      null
    );
    insertTask(
      website,
      'Migrate blog to new CMS',
      'backlog',
      'high',
      bob,
      alice,
      inFiveDays
    );

    insertTask(
      website,
      'Build responsive nav component',
      'todo',
      'high',
      carol,
      alice,
      inFiveDays
    );
    insertTask(
      website,
      'Wire up contact form validation',
      'todo',
      'medium',
      bob,
      alice,
      null
    );
    insertTask(
      website,
      'Add dark mode toggle to footer',
      'todo',
      'low',
      null,
      carol,
      null
    );

    insertTask(
      website,
      'Rebuild pricing table layout',
      'in_progress',
      'high',
      bob,
      alice,
      inFiveDays
    );
    insertTask(
      website,
      'Optimize hero image delivery',
      'in_progress',
      'medium',
      carol,
      alice,
      null
    );
    insertTask(
      website,
      'Integrate new testimonials carousel',
      'in_progress',
      'medium',
      carol,
      bob,
      yesterday
    );

    insertTask(
      website,
      'Accessibility pass on new components',
      'in_review',
      'high',
      alice,
      carol,
      inFiveDays
    );
    insertTask(
      website,
      'Cross-browser QA for homepage',
      'in_review',
      'medium',
      bob,
      alice,
      null
    );
    insertTask(
      website,
      'Copy review for footer links',
      'in_review',
      'low',
      carol,
      alice,
      null
    );

    insertTask(
      website,
      'Ship new favicon and app icons',
      'done',
      'low',
      bob,
      alice,
      null
    );
    insertTask(
      website,
      'Set up staging environment',
      'done',
      'medium',
      alice,
      alice,
      null
    );
    insertTask(
      website,
      'Migrate DNS to new provider',
      'done',
      'high',
      bob,
      alice,
      null
    );
    insertTask(
      website,
      'Remove legacy jQuery widgets',
      'done',
      'medium',
      carol,
      bob,
      null
    );
    insertTask(
      website,
      'Write launch announcement post',
      'done',
      'low',
      alice,
      alice,
      null
    );

    insertTask(
      mobileApp,
      'Design onboarding flow',
      'todo',
      'high',
      alice,
      dana,
      inFiveDays
    );
    insertTask(
      mobileApp,
      'Set up crash reporting',
      'backlog',
      'medium',
      dana,
      dana,
      null
    );
    insertTask(
      mobileApp,
      'Sketch app icon concepts',
      'backlog',
      'low',
      alice,
      dana,
      null
    );
    insertTask(
      mobileApp,
      'Research push notification providers',
      'backlog',
      'medium',
      null,
      dana,
      null
    );
    insertTask(
      mobileApp,
      'Wire up analytics SDK',
      'todo',
      'medium',
      dana,
      dana,
      null
    );
    insertTask(
      mobileApp,
      'Build login screen',
      'in_progress',
      'high',
      alice,
      dana,
      inFiveDays
    );
    insertTask(
      mobileApp,
      'Review App Store submission checklist',
      'in_review',
      'medium',
      dana,
      alice,
      null
    );
    insertTask(
      mobileApp,
      'Finalize color palette',
      'done',
      'low',
      alice,
      dana,
      null
    );
    insertTask(
      mobileApp,
      'Set up CI pipeline',
      'done',
      'medium',
      dana,
      dana,
      null
    );

    // --- Subtasks ---
    db.prepare(
      'INSERT INTO subtasks (task_id, title, is_completed) VALUES (?, ?, ?)'
    ).run(homepageTask, 'Draft three hero concepts', 1);
    db.prepare(
      'INSERT INTO subtasks (task_id, title, is_completed) VALUES (?, ?, ?)'
    ).run(homepageTask, 'Get feedback from the team', 0);

    // --- Comments ---
    const comment = db
      .prepare(
        'INSERT INTO comments (task_id, author_id, body) VALUES (?, ?, ?)'
      )
      .run(
        homepageTask,
        alice,
        '@carol can you share the first draft by Friday?'
      ).lastInsertRowid as number;
    db.prepare(
      'INSERT INTO comments (task_id, author_id, body) VALUES (?, ?, ?)'
    ).run(homepageTask, carol, 'Sure, working on it now.');

    // --- Notifications ---
    db.prepare(
      'INSERT INTO notifications (user_id, type, data) VALUES (?, ?, ?)'
    ).run(
      carol,
      'task_assigned',
      JSON.stringify({
        taskId: homepageTask,
        taskTitle: 'Design new homepage hero'
      })
    );
    db.prepare(
      'INSERT INTO notifications (user_id, type, data) VALUES (?, ?, ?)'
    ).run(
      carol,
      'mentioned_in_comment',
      JSON.stringify({ taskId: homepageTask, commentId: comment })
    );

    // --- Activity ---
    db.prepare(
      'INSERT INTO activities (organization_id, project_id, actor_id, action, entity_type, entity_id, metadata) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(
      acme,
      website,
      alice,
      'task.created',
      'task',
      homepageTask,
      JSON.stringify({ title: 'Design new homepage hero' })
    );
    db.prepare(
      'INSERT INTO activities (organization_id, project_id, actor_id, action, entity_type, entity_id, metadata) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(
      acme,
      website,
      alice,
      'task.assigned',
      'task',
      homepageTask,
      JSON.stringify({ title: 'Design new homepage hero', assigneeId: carol })
    );
  })();

  console.log(
    `Seed complete (${now()}). Demo accounts (password: "password123"):`
  );
  console.log(
    '  alice@example.com  — owner of Acme Robotics, member of Nimbus Studio'
  );
  console.log('  bob@example.com    — admin of Acme Robotics');
  console.log('  carol@example.com  — member of Acme Robotics');
  console.log('  dana@example.com   — owner of Nimbus Studio');
}

seed();
