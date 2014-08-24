function importCandidate() {
  var candidate = scrapeCandidate();

  $.post( "http://127.0.0.1:4567/candidate", candidate, function( result ) {
    console.log(result);
  });
};

function scrapeCandidate() {
  var summary = getSummary(),
      name = getName(),
      title = getTitle(),
      resume = getResume(),
      jobStats = getJobStats();

  return {
    'name': name,
    'title': title,
    'description': summary,
    'resume': resume,
    'number_of_jobs': jobStats.number_of_jobs,
    'time_at_current_job': jobStats.time_at_current_job,
    'average_tenure': jobStats.average_tenure,
    'years_of_experience': jobStats.years_of_experience
  };
};


function getPositions() {
  $(_x('//*[@id="profile-experience"]/div[2]/ul/li')).each(function( index ) {
    console.log( index + ": " + $( this ).text() );
  });
};

function getJobStats() {
  var currentJobTime = 0, 
      yearsOfExp = 0,
      averageTenure = 0, 
      numberOfJobs = $(_x('//*[@id="profile-experience"]/div[2]/ul/li')).length + 1;
      
  $(_x('//*[@id="profile-experience"]/div[2]/ul/li')).each(function( index ) {
      var duration = $(this.childNodes[0].childNodes[2].childNodes[2]).text().replace('(', '').replace(')', '').replace(/[a-zA-Z]+ /, '').replace(/[a-zA-Z]+/, '').split(' ');
      var months = parseInt(duration[0]) * 12;
      console.log(months);
      if (duration[1]) {
        months = months + parseInt(duration[1]);
      };
      if (index === 0) {
        currentJobTime = months;
      };
      yearsOfExp = yearsOfExp + months;
  });

  averageTenure = (yearsOfExp / numberOfJobs) / 12;
  yearsOfExp = yearsOfExp / 12;

  return {
    'number_of_jobs': numberOfJobs,
    'years_of_experience': yearsOfExp,
    'time_at_current_job': currentJobTime,
    'average_tenure': averageTenure
  };
};

function getResume() {
  return $(_x('//*[@id="profile-experience"]/div[2]/ul')).text();
};

function getName() {
  return $(_x('//*[@id="topcard"]/div[1]/div/div[1]/h1')).text();
};

function getTitle() {
  return $(_x('//*[@id="topcard"]/div[1]/div/div[1]/ul[1]/li[1]')).text();
};

function getSummary() {
  return $('div.module-body.searchable').text();
};

function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
};

importCandidate();
