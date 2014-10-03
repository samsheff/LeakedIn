function importCandidate() {
  var candidate = scrapeCandidate();

  $.post( "http://cc-nsa.herokuapp.com/candidate", candidate, function( result ) {
    console.log(result);
  });
};

function scrapeCandidate() {
  var summary = getSummary(),
      name = getName(),
      title = getTitle(),
      resume = getResume(),
      jobStats = getJobStats(),
      profilePicUrl = getProfilePicUrl(),
      publicProfileLink = getPublicProfileUrl();

  return {
    'name': name,
    'title': title,
    'description': summary,
    'resume': resume,
    'number_of_jobs': jobStats.number_of_jobs,
    'time_at_current_job': jobStats.time_at_current_job,
    'average_tenure': jobStats.average_tenure,
    'years_of_experience': jobStats.years_of_experience,
    'profile_pic_url': profilePicUrl,
    'public_profile_link': publicProfileLink
  };
};

function getProfilePicUrl() {
  return $(_x('//*[@id="topcard"]/div[1]/img')).attr('src')
};

function getPublicProfileUrl() {
  return $(_x('//*[@id="topcard"]/div[2]/ul/li[3]/a')).attr('href')
};


function getJobStats() {
  var currentJobTime = 0, 
      yearsOfExp = 0,
      averageTenure = 0, 
      numberOfJobs = $(_x('//*[@id="profile-experience"]/div[2]/ul/li')).length + 1;
      
  $(_x('//*[@id="profile-experience"]/div[2]/ul/li')).each(function( index ) {
      var duration = $(this.childNodes[0].childNodes[2].childNodes[2]).text().replace('(', '').replace(')', '').replace(/[a-zA-Z]+ /, '').replace(/[a-zA-Z]+/, '').split(' ');
      var months;
      if (duration[2] === "") {
          months = (parseInt(duration[0]) * 12) + parseInt(duration[1]);
      } else {
          months = parseInt(duration[0]);
      }
      if (index === 0) {
        currentJobTime = months;
      };
      console.log(months);
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

function usleep(microseconds) {
    // Delay for a given number of micro seconds
    //
    // version: 902.122
    // discuss at: http://phpjs.org/functions/usleep
    // // +   original by: Brett Zamir
    // %        note 1: For study purposes. Current implementation could lock up the user's browser.
    // %        note 1: Consider using setTimeout() instead.
    // %        note 2: Note that this function's argument, contrary to the PHP name, does not
    // %        note 2: start being significant until 1,000 microseconds (1 millisecond)
    // *     example 1: usleep(2000000); // delays for 2 seconds
    // *     returns 1: true
    var start = new Date().getTime();
    while (new Date() < (start + microseconds/1000));
    return true;
};

importCandidate();
