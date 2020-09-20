'use strict';

const Counters = require('../models/counters.js');
const UrlEntries = require('../models/urlEntries.js');
const dns = require('dns');

function getCountAndIncrease (req, res, callback) {
  Counters
    .findOneAndUpdate({}, {$inc:{'count': 1}}, (err, data) => {
      if (err) return;
      if (data) {
        callback(data.count);
      } else {
        const newCounter = new Counters();
        newCounter
          .save(function(err) {
            if (err) return;
            Counters
              .findOneAndUpdate({}, {$inc:{'count': 1}}, (err, data) => {
                if (err) return;
                callback(data.count);
              });
          });
      }
    });
}

// Search for '://', store protocol and hostname+path
const protocolRegExp = /^https?:\/\/(.*)/i;

// Search for patterns like xxxx.xxxx.xxxx etc.
const hostnameRegExp = /^([a-z0-9\-_]+\.)+[a-z0-9\-_]+/i;

exports.addUrl = function (req, res) {
  
    let url = req.body.url;
    
    // "www.example.com/test/" and "www.example.com/test" are the same URL
    if ( url.match(/\/$/i))
      url = url.slice(0,-1);
    
    const protocolMatch = url.match(protocolRegExp);
    if (!protocolMatch) {
      return res.json({"error": "Invalid URL"});
    }
    
    // Remove the protocol temporarily  for DNS lookup
    const hostAndQuery = protocolMatch[1];

    // Here we have a URL w/out protocol
    // DNS lookup: validate hostname
    const hostnameMatch = hostAndQuery.match(hostnameRegExp);
    if (hostnameMatch) {
      // the URL has a valid www.whaterver.com[/something-optional] format
      dns.lookup(hostnameMatch[0], (err) => {
        if(err) {
          // no DNS match, invalid Hostname, the URL won't be stored
          res.json({ "error": "Invalid Hostname" });
        } else {
          // URL is OK, check if it's already stored
          UrlEntries
            .findOne({"url": url}, (err, storedUrl) => {
              if (err) return;
              if (storedUrl) {
                // URL is already in the DB, return the matched one
                res.json({ "original_url": url, "short_url": storedUrl.index });
              } else {
                // Increase Counter and store the new URL,
                getCountAndIncrease(req, res, function(cnt) {
                  const newUrlEntry = new UrlEntries({
                    'url': url,
                    'index': cnt
                  });
                  // then return the stored data.
                  newUrlEntry
                  .save(function(err) {
                    if (err) return;
                    res.json({ "original_url": url, "short_url": cnt });
                  });
                });
              }
            });
          }
        });
      } else {
        // the URL has not a www.whatever.com format
        res.json({ "error": "Invalid URL" });
      }
    };

exports.processShortUrl = function (req, res) {
    const shurl = req.params.shurl;
    if (!parseInt(shurl,10)) {
      // The short URL identifier is not a number
      res.json({ "error": "Wrong format" });
      return;
    }
    UrlEntries
      .findOne({ "index": shurl }, (err, data) => {
        if (err) return;
        if (data){
          // redirect to the stored page
          res.redirect(data.url);
        } else {
          res.json({ "error": "No short URL found for the given input" });
        }
      });
  };
