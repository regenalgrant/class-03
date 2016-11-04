'use strict';
(function(module) {

  /* this creating an Article object*/
  function Article(opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }

  /*this is a method on the prototype so each object comes with its own html template*/
  Article.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = this.body;
    return template(this);
  };


 /* grabs the json data, loads it and stores it in local storage for later*/
  Article.getAll = function(next) {
    $.getJSON('scripts/Articles.json', function(responseData) {
      Article.loadAll(responseData); //loading the data we just got
      localStorage.hackerIpsum = JSON.stringify(responseData);
      next(); //calling next function (which was passed as a parameter, in this case it would be "renderIndexPage()")
    });
  };
/* use the data we got from getAll , sort it and call the Article constuctor, which return an article object*/
  Article.loadAll = function(inputData) {
    Article.allArticles = inputData.sort(function(a, b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Article(ele);
    });
  };

  Article.fetchAll = function(next) {
    if (localStorage.hackerIpsum) {
      Article.loadAll(JSON.parse(localStorage.hackerIpsum));
      next();
    } else {
      Article.getAll(next);
    }
  };

  Article.numWordsAll = function() {
    return Article.allArticles.map(function(article) {

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
})(window);
