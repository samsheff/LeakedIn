//Simple function for checking for accounts we've already seen/scraped in Recruiter
$('.picture-link')
    .each(function () {
        if ($(this)
            .parent()
            .children('div.vcard')
            .children('.activity')
            .children('li')
            .length === 0) {
            $(this)
                .attr('viewed', "true");
        }
    });
