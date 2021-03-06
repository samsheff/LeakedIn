function importCandidate() {
    var candidate = scrapeCandidate();

    $.post("http://captaincoffee.herokuapp.com/candidate", candidate, function (result) {
        console.log(result);
    });
}

function scrapeCandidate() {
    var summary = getSummary(),
        name = getName(),
        title = getTitle(),
        resume = getResume(),
        jobStats = getJobStats(),
        profilePicUrl = getProfilePicUrl();

    return {
        'name': name,
        'title': title,
        'description': summary,
        'resume': resume,
        'number_of_jobs': jobStats.number_of_jobs,
        'time_at_current_job': jobStats.time_at_current_job,
        'average_tenure': jobStats.average_tenure,
        'years_of_experience': jobStats.years_of_experience,
        'profile_pic_url': profilePicUrl
    };
}

function getProfilePicUrl() {
    return $(_x('//*[@id="control_gen_6"]/img'))
        .attr('src');
}

function getJobStats() {
    var currentJobTime = 0,
        yearsOfExp = 0,
        averageTenure = 0,
        numberOfJobs = $('#background-experience')
        .children('div')
        .length + 1;

    $('.experience-date-locale')
        .each(function (index) {
            var duration = $($(this)[0])
                .text()
                .replace('(', '')
                .replace(',', '')
                .replace(')', '')
                .replace(/\s+year\s/, ' ')
                .replace(/\s+years\s/, ' ')
                .replace(/[a-zA-Z]+/, '')
                .replace(/[a-zA-Z]+/, '')
                .replace(/\s/, '')
                .replace(' – ', '')
                .replace(/[0-9]{4}/, '')
                .replace(/[0-9]{4}/, '')
                .replace(/month.+/, '')
                .replace(' ', '')
                .split(' ');
            var months;
            if (index === 0) {
                if (duration[1]) {
                    months = (parseInt(duration[0]) * 12) + parseInt(duration[1]);
                } else {
                    months = parseInt(duration[0]);
                }
            } else {
                if (duration[2]) {
                    months = (parseInt(duration[1]) * 12) + parseInt(duration[2]);
                } else {
                    months = parseInt(duration[1]);
                }
            }
            if (index === 0) {
                currentJobTime = months;
            }
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
}

function getResume() {
    return $("#background-experience")
        .text();
}

function getName() {
    return $('.full-name')
        .text();
}

function getTitle() {
    return $('.title ')
        .text();
}

function getSummary() {
    return $('p.description')
        .text();
}

importCandidate();
