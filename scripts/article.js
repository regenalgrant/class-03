'use strict';

(function(module) {
  var articles = [];
  function Article(opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }
  Article.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);
    return template(this);
  };

  ourLocalData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  ourLocalData.forEach(function(ele) {
    articles.push(new Article(ele));
  });
  Article.loadAll = function(inputData) {

    Article.allArticles = inputData.sort(function(a, b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Article(ele);
    });
  };
  Article.fetchAll = function(next) {
    if (localStorage.hackerIpsum) {
      $.ajax({
        type: 'HEAD',
        url: '/data/hackerIpsum.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {

            Article.getAll(next);
          } else {
            Article.loadAll(JSON.parse(localStorage.hackerIpsum));
            next();
          }
        }
      });
    } else {
      Article.getAll(next);
    }
  };
  Article.getAll = function(next) {
    $.getJSON('/data/hackerIpsum.json', function(responseData, message, xhr) {
      localStorage.eTag = xhr.getResponseHeader('eTag');
      Article.loadAll(responseData);
      localStorage.hackerIpsum = JSON.stringify(responseData);
      next();
    });
  };

  Article.numWordsAll = function() {
    return Article.allArticles.map(function(article) {
            // NOTE: Grab the word count from each article body.
      return article.body.split(' ').length;
    })

        .reduce(function(prev, next) {
          return prev + next;
        });
  };

  Article.allAuthors = function() {
    return Article.allArticles.map(function(article) {
      return article.author;
    })
    .reduce(function(acc, cur) {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur);
      }
      return acc;
    }, []);
  };
  Article.numWordsByAuthor = function() {

    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Article.allArticles.filter(function(curArt) {
          if (curArt.author === author) {
            return curArt;
          }
        })
                .map(function(article) {
                  return article.body.split(' ').length;
                })
                .reduce(function(prev, next) {
                  return prev + next;
                })
      };
    });
  };
  module.Article = Article;
}) (window);
