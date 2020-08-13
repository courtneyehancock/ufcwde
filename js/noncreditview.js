jQuery(document).ready(function ($) {

    getNonCreditCourses();
    $('.nullResults').hide();

    //$('.sk-circle').hide();
    $(function () {
        $(".accordion").accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });
    });

    createTemplate();

    $("#form1").submit(function (e) { e.preventDefault(); });

    // Significant changes here by jmachupa@ufl.edu, 3/4/2020
    // I tried to comment things a little more clearly than my predecessors :)
    $(document).on("change", "select", function () {

        // [3/4/2020] URL Addition Functionality
        // [3/4/2020] Dynamically grabs the current URL, allows for the additional parts to be added regardless of URL location.
        var new_url = "?";
        var current_url = window.location.href;
        var current_url_base = current_url.slice(0, current_url.indexOf("?"));

        // [3/4/2020] Resetting the courses that are currently displayed and filtered, also grabs the state of both select menus to process what needs to be done.
        resetFilteredCourses();
        var courses_temp = courses;
        var additional_value = $("#additionalSearch option:selected").text().toLowerCase();
        var category_value = $("#categorySearch option:selected").text().toLowerCase();
        // [3/4/2020] If they happen to be set to defaults, set the values to 0, since orginally they where using the "value" vs the literal text.
        if (category_value === "select a category") { category_value = "0"; }
        if (additional_value === "refine your search") { additional_value = "0"; }
        //console.log("additional_value: " + additional_value + " | category_value: " + category_value);

     //   console.log("Value:" + category_value);
        // [3/4/2020] Was a catagory value selected? Yes? Lets filter by that.
        if (category_value !== "0")
        {
            $.each(courses_temp, function (key, value) {
                var ckeywords = value.Keywords;
                console.log(category_value + " | " + ckeywords);
                if (ckeywords.indexOf(category_value) !== -1) {
                    filteredCourses.push(value);
                }

            });
        }
        // [3/4/2020] Was a additional filter value selected? Yes? Lets filter by that.
        if (additional_value === "0") {
            if (category_value === "0") {/* If nothing selected, just return the course list */ filteredCourses = courses;}
        } else {
            // [3/4/2020] Did we already filter some courses? If so, let's reset the filtered courses array, and generate a new temporary array to manipulate.
            if (filteredCourses.length > 0) { courses_temp = filteredCourses; filteredCourses = []; }

            // [3/4/2020] So, we're filtering by an additional value. Well, which one? Lets make sure it matches exactly.
            if (additional_value=== "pre-certification") {

                // [3/4/2020] Cycle through each course, filtering as needed (this action is similar on all following options)
                $.each(courses_temp, function (key, value) {
                    var ckeywords = value.Keywords;
                    if (ckeywords.indexOf("pre-certification") !== -1)
                    {
                        filteredCourses.push(value);
                }

                });
            }
            if (additional_value === "open enrollment") {
                $.each(courses_temp, function (key, value) {
                            if (value.OpenEnrollment)
                            {
                                filteredCourses.push(value);
                            }

                });
            }
            if (additional_value=== "pre-licensure") {
                $.each(courses_temp, function (key, value) {
                    var ckeywords = value.Keywords;
                    if (ckeywords.indexOf("pre-licensure") !== -1) {
                        filteredCourses.push(value);
                    }

                });
            }
            if (additional_value=== "free") {
                $.each(courses_temp, function (key, value) {
                    var cfee = value.Fee;
                    // [3/4/2020] Was it really ever free? Strip the actual fee numbers off the string we're given by value.fee
                    var fee_amount = cfee.slice(cfee.indexOf(";") + 1, cfee.length);
                    if (parseInt(fee_amount) <= 0) {
                        filteredCourses.push(value);
                    }

                });
            }
            if (additional_value === "paid") {
                $.each(courses_temp, function (key, value) {
                    var cfee = value.Fee;
                    // [3/4/2020] I knew it wasn't really free... Strip the actual fee numbers off the string we're given by value.fee
                    var fee_amount = cfee.slice(cfee.indexOf(";") + 1, cfee.length);
                    if (parseInt(fee_amount) > 0) {
                        filteredCourses.push(value);
                    }

                });
            }
        }
        $("#nonCreditCourseContainer").empty();
        renderCourses();
        // [3/4/2020] Set the new URL addition to the values of the selected items.
        category_value = category_value.replace(" ", "&");
        additional_value = additional_value.replace(" ", "&");
        new_url += category_value + "!" + additional_value;
        // [3/4/2020] Update the URL in the actual browser, so it can be copied, shared, etc.
        window.history.replaceState("", "Course Search", current_url_base +new_url);

        // [3/4/2020] Resetting the Course Search text box. Had issues when people would be searching something then change the drop down menus.
        $('input:text').val('');
    });

    // [3/4/2020] Old method of searching through a category. Only here for archrival reasons.
    /*
    $(document).on("change", "select.categorySearch", function () {
        resetFilteredCourses();

        var category = $("select.categorySearch option:selected").val();
        if ($("select.categorySearch option:selected").val() === "0") {
            filteredCourses = courses;
            ///Open Enrollment, Pre-certification, Pre-Licensure, Free & Paid
        } else {
            $.each(courses, function (key, value) {
                var cName = value.CourseName;
                var cfee = value.Fee;
                var ckeywords = value.Keywords;
            //    alert(cfee);
             //   alert(ckeywords);
                if (_.some(value.Keywords, function (val) { return val === category.toLowerCase() })
                    || cName.toLowerCase().indexOf($.trim(category.toLowerCase())) !== -1
                    || category === "Open" && value.OpenEnrollment) {
                    filteredCourses.push(value);
                }
            });
        }
        $("#nonCreditCourseContainer").empty();
        renderCourses();
    });
    */
    var courseFilterFunction = function (index, course, search) {

        course.search_strength = 0; //reset search strength
        search = search.toLowerCase();
        search = $.trim(search);
        var search_words = search.split(" ");
        var keywords_join = course.Keywords.join().toLowerCase(); //keywords should be trimmed
        var course_name = $.trim(course.CourseName).toLowerCase();
        var full_match_title_weight = 5;
        var full_match_keyword_weight = 3;
        var partial_keyword_match_weight = 2;
        var partial_title_match_weight = 4;
        var weight_threshold = 2;

        //first try and match whole search text in title
        if (course_name.indexOf(search) != -1) {
            //exact search text match in title or keywords
            course.search_strength = full_match_title_weight;
            console.log(course.CourseName);
        }

        if (keywords_join.indexOf(search) != -1) {
            course.search_strength += full_match_keyword_weight;
        }

        //try and match each word of the search text
        for (var i = 0; i < search_words.length; ++i) {
            var word = search_words[i];

            if (keywords_join.indexOf(word) != -1) {
                course.search_strength += partial_keyword_match_weight;
            }

            if (course_name.indexOf(word) != -1) {
                course.search_strength += partial_title_match_weight;
            }
        }

        if (course.search_strength >= weight_threshold) {
            filteredCourses.push(course);
        }

    };

    var courSearch = function (search) {
        //resetFilteredCourses();
        var courses_temp = filteredCourses;
        resetFilteredCourses();
        $.each(courses_temp, function (key, value) { courseFilterFunction(key, value, search) });
        filteredCourses = _.sortBy(filteredCourses, [function (c) { return -c.search_strength; }]);
        $("#nonCreditCourseContainer").empty();
        renderCourses();
    };

    var getSearchBoxText = function () {
        return $("#cSearch").val();
    }

    //course search - searches by Course Title and Course Keyword
    $(document).on("click", "#courseSearch", function (event) {
        courSearch(getSearchBoxText());
    });

    //handle enter key
    $('#cSearch').keyup(function (e) {
        if (e.which == 13)
            courSearch(getSearchBoxText());
    });

    //Handle clicking on keywords at the bottom of each course
    $(document).on("click", "a.keyword", function (event) {
        courSearch(this.id);
    });

    $(document).on("click", "#reset", function () {
        filteredCourses = courses;
        currentPage = 1;
        $("#nonCreditCourseContainer").empty();
        renderCourses();
        $('input:text').val('');
        $("select").trigger("change");
    });

    $('body').append('<a href="#top" class="back-to-top">Back to top</a>'); //scrolling Back to Top link

    $('a.back-to-top').click(function (e) {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        e.preventDefault();
    });

    $(window).scroll(function () {
        if ($('body').offset().top < $(window).scrollTop()) {
            $('.back-to-top').slideDown('fast');
        } else {
            $('.back-to-top').slideUp('fast');
        }
    });

});//end doc ready

var resetFilteredCourses = function () {
    currentPage = 1;
    filteredCourses = [];
}


function categoryFiltered(category) {

    resetFilteredCourses();

    //filtered = [];
    $.each(courses, function (key, value) {
        var cName = value.CourseName;

        if (_.some(value.Keywords, function (val) { return val === category.toLowerCase() }) || cName.toLowerCase().indexOf($.trim(category.toLowerCase())) !== -1) {
            filteredCourses.push(value);
            //filtered.push(value);


        }
    });
    $("#cSearch").val(category);
    $("select.categorySearch").val(category);
    $("#nonCreditCourseContainer").empty();
    renderCourses();
}

var filtered = [];
var userGroups = [];

//load usergroups dropdown menu - not using currently
var loadUserGroupDropDown = function () {
    $.each(userGroups[0], function (key, value) {
        $('.userGroupSearch').append("<option value=" + value.UserGroupId + ">" + value.UserGroupName + "</option>");
    });
    $('.userGroupSearch').multiselect();
    $('.userGroupSearch').multiselect('refresh');
}

// [3/4/2020] Load category dropdown
var loadCategories = function () {
    var categories = ["building construction", "continuing medical", "continuing dental", "continuing pharmacy","business", "education", "environmental", "foodservice", "forensics", "healthcare", "sustainability", "technology", "veterinary"];
    global_categories = categories;
    var l = 0;

    for (l = 0; l < categories.length; l++) {
        console.log(categories[l]);
        var temp = categories[l];
        $('.categorySearch').append("<option value=\"" + temp + "\">" + temp + "</option>");
    }

};

// [3/4/2020] Load additional dropdown
var loadAdditional = function () {
    var additionalCategories = ["open enrollment", "pre-certification", "pre-Licensure", "free", "paid"];
    global_additionalCategories = additionalCategories;
    $.each(additionalCategories, function (key, value) {
        $('.additionalSearch').append("<option value=" + value + ">" + value + "</option>");
    });

};

var isInitialLoad = true;
var courses = []; //global array to store course data
var filteredCourses = [];  //holds courses for current filtering
var global_additionalCategories = []; // [3/4/2020] Global array of possible Categories [used for URL-holding of page]
var global_categories = []; // [3/4/2020] Global array of possible AdditionalCategories [used for URL-holding of page]
var split_url = []; // [3/4/2020] Stores the split up array of the URL.
var currentPage = 1;
var itemsPerPage = 10;
//formatResults formats jsonp array values to bind to Lodash template
var formatResults = function (result) {
    _.forEach(result, function (course) {
        var courseUrl;
        var sections = [];
        _.forEach(course.SectionInfo, function (section) {

            var enrollDate;
            var courseDate;
            var locationValue;
            var theFuture = moment().add(2, 'years').calendar();

            //TODO: check to see when this is used
            if (moment(theFuture).isBefore(section.RegistrationCloseDate, "MM DD YYYY")) {
                enrollDate = "Open Enrollment"
            } else {
                enrollDate = section.RegistrationOpenDate + " - " + section.RegistrationCloseDate
            }

            //2-27-2017 fix to display correct enrollment and course dates on open enrollment courses.
            //Enrollment Date: 01/01/1980 - 01/01/1900
            //Course Date(s): 01/01/1900 - 01/01/1900
            if (course.OpenEnrollment) {
                enrollDate = moment().format('MM/DD/YYYY');
                courseDate = "Open Enrollment";
            }
            //end 2-27-2017 fix

            if (!_.isEmpty(section.City) && !_.isEmpty(section.State)) {
                locationValue = section.City + ", " + section.State;
            }
            if (!_.isEmpty(section.City) && _.isNil(section.State)) { locationValue = section.City; }
            if (_.isEmpty(section.City) && !_.isEmpty(section.State)) {
                locationValue = section.State;
            }
            if (_.isEmpty(section.City) && _.isEmpty(section.State)) {
                locationValue = "Online";
            } else {
                locationValue = "";
            }

            if (course.Source === "QR") { courseUrl = "https://reg.distance.ufl.edu/reg/Activity/Details/" + course.Url }
            else { courseUrl = "https://xms.dce.ufl.edu/reg/groups/all/course.aspx?c=" + course.CourseId + "&ug=" + course.UserGroupId }


            sections.push({
                SectionId: section.SectionId,
                SectionTitle: section.SectionTitle,
                Section: section.Section,
                Fee: section.Fee,
                CourseId: section.CourseId,
                CourseUrl: courseUrl,
                CreditType: section.CreditType,
                EnrollmentDate: enrollDate,
                CourseDate: courseDate,
                RegistrationOpenDate: section.RegistrationOpenDate,
                RegistrationCloseDate: section.RegistrationCloseDate,
                SectionBeginDate: section.SectionBeginDate,
                SectionEndDate: section.SectionEndDate,
                Location: locationValue,
                City: section.City,
                State: section.State
            });
        });//end SectionInfo loop

        var registrationDate = "";
        var feeValue = "";

        var SectionCount = (_.countBy(course.SectionInfo, 'length'));

        if (course.SectionInfo.length === 1) {
            if (course.OpenEnrollment === 1) {
                registrationDate = moment().format('L');
            } else { registrationDate = course.SectionInfo.RegistrationOpenDate }
        } //else if there is more than one section, check to see if they are all open enrollment
        else {
            if (_.minBy(course.SectionInfo, 'OpenEnrollment') === _.maxBy(course.SectionInfo, 'OpenEnrollment')) {
                registrationDate = moment().format('L');
            } else {
                registrationDate = "Various Dates";
            }
        }

        if ((_.minBy(course.SectionInfo, 'Fee')).Fee === (_.maxBy(course.SectionInfo, 'Fee')).Fee) { feeValue = "<span class=\'strong'\>Fee:</span> &#36;" + course.SectionInfo[0].Fee }
        else { feeValue = "<span class=\'strong'\>Fee Range:</span> &#36;" + (_.minBy(course.SectionInfo, 'Fee')).Fee + "  - &#36;" + (_.maxBy(course.SectionInfo, 'Fee')).Fee }

        if (course.Source === "QR") { courseUrl = "https://reg.distance.ufl.edu/reg/Activity/Details/" + course.Url } else { courseUrl = "https://xms.dce.ufl.edu/reg/groups/all/course.aspx?c=" + course.CourseId + "&ug=" + course.UserGroupId }

        courses.push({
            CourseName: course.CourseName,
            CourseId: course.CourseId,
            CourseDesc: course.CourseDesc,
            Keywords: course.Keywords,
            MarketingUrl: course.MarketingUrl,
            MaxFee: course.MaxFee,
            MinFee: course.MinFee,
            Fee: feeValue,
            OpenEnrollment: course.OpenEnrollment,
            //RegistrationDate: SectionCount,
            RegistrationDate: registrationDate,
            Source: course.Source,
            Url: courseUrl,
            UserGroupId: course.Source + course.UserGroupId, //combine source with User GroupID to avoid conflicts. Ex: XMS1, QR1
            UserGroupName: course.UserGroupName,
            UGId: course.UserGroupId, //pass in real usergroupId for building XMS page url
            SectionInfo: sections
        });
    }); //end courses loop
    sections = [];

    filteredCourses = courses;
}; //end formatResults function

//
/**
 *Create template compiles the lodash template that will be used for each course
 */
var createTemplate = function () {

    // [3/4/2020] Load all this up into an array, then denamically shift that array based on what's searched for.
    coursesTemplate = _.template("<% _.forEach(courses, function(course) { %>" +
        "<section class=\"courseContainer\"> " +
        "<img src=\"https://secure.aa.ufl.edu/Shared/DistanceMarketPlace/<%-course.Source%>/UnitID/<%- course.UserGroupId %>/<%- course.CourseId %>/<%- course.MarketingUrl %>\">" +
        "<h3><%- course.CourseName %> </h3>" +
        //"<p class=\"courseDesc\"><%- course.CourseDesc %></p>" +
        "<input class=\"courseId\" type=\"hidden\" value=\"<%- course.CourseId %>\"></input>" +
        "<input class=\"unitId\" type=\"hidden\" value=\"<%- course.UserGroupId %>\"></input>" +
        "<a class=\"btn\" href=\"<%- course.Url %> \">Learn More</a>" +
        "<span>Keywords: <% _.forEach(course.Keywords, function(keyword){ %><a id=\'<%- keyword %>\' class=\'keyword\'><%- keyword %></a> -  <% }) %></span>" +
        "</section>" +//end course container
        "<% }) %>", //end courseForEach loop
        {
            'imports': { 'jq': jQuery }
        });//end compiled var
}

/**
 * Renders paged courses
 */
var renderCourses = function () {

    //Grab paged courses
    var courses = _.chain(filteredCourses)
        .drop((currentPage - 1) * itemsPerPage)
        .take(itemsPerPage)
        .value();

    //Grab course elements so we can put the like button on them below
    var newCourses = $(coursesTemplate({ "courses": courses }));
    $("#nonCreditCourseContainer").append(newCourses);

    //Reset results
    $('.resultCount').empty();
    if (filteredCourses.length < 1) {
        $('.resultCount').html('<p>No results found.</p>');
        $('.nullResults').show();
        $('.nullResults').html('<h2>No courses found. Please try your search again.</h2>');
    } else {
        $('.resultCount').html('<p>' + filteredCourses.length + ' results</p>');
        $('.nullResults').hide();

    }

    $(function () {
        $(".accordion").accordion({
            collapsible: true,
            active: false,
            heightStyle: "content"
        });
    });



    //We skip the intial page load because the script on the page already does this upon page load
    if (!isInitialLoad) {
        _.forEach(newCourses, function (course) {
            FB.XFBML.parse(course, function () {
            });
        });
    }

    $('.sk-circle').hide();

    //Once first scrolling back up is done we need to
    if (isInitialLoad) {
        $('html, body').animate({ scrollTop: 0 }, 'slow', function () {
            setupInfiniteScrolling();
        });
    }


}

/**
  * Sets the listener on scrolling to determine if it's a new page
 */
var setupInfiniteScrolling = function () {

    //Not sure if both element animations are need needed but the animate is on html and body which calls this twice, so we ignore the first
    if (isInitialLoad) {
        isInitialLoad = false;
        return;
    }


    $(window).scroll(function () {

        //If at bottom increment the current page and render new courses
        if ($(document).height() - window.innerHeight - 600 < $(window).scrollTop()) {
            currentPage++;
            renderCourses();
        }
    });
}





//get course/section collection from the app and return JsonP
function getNonCreditCourses() {
    $.jsonp({

        url: 'https://secure.aa.ufl.edu/DCE/DCEData/Distance/Course/NonCreditCourses/',
        contentType: 'application/json; charset=utf-8',
        callbackParameter: 'callback',
        dataType: "jsonp",
        timeout: 15000,
        success: displayCourses,
        error: courseRetrievalError
    });

    // [3/4/2020] Function to not only select a specific element, but also to trigger the change event associated with that selection.
    function selectElement(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect;
        $("select").trigger("change");
    }

    // [3/4/2020] Function used to set some initial paramaters for the URL-handling.
    function url_parse() {
        var verify_global_additionalCategories = ["0", ...global_additionalCategories];
        var verify_global_categories = ["0", ...global_categories];
        console.log(verify_global_additionalCategories);
        console.log(verify_global_categories);
        var current_url = window.location.href;
        var index_of = current_url.indexOf("?");
        var current_url_base = current_url.slice(0, index_of);
        var current_url_ext = current_url.slice(index_of + 1, current_url.length);
        if (index_of < 0) { split_url = ["0", "0"]; window.history.replaceState("", "Course Search", current_url_base + "//");}
        else {
            split_url = current_url_ext.split("!", -1);
        }
        // [3/4/2020] I would do all of this in a for loop normally, but since it's just 3 things it's done the longer way.
        split_url[0] = split_url[0].replace("&", " ");
        split_url[1] = split_url[1].replace("&", " ");
        if (verify_global_categories.indexOf(split_url[0].toLowerCase()) < 0 || verify_global_additionalCategories.indexOf(split_url[1].toLowerCase()) < 0) { split_url = ["0", "0"]; }

        /* // [3/4/2020] Here just incase things go wrong, sanity check :)
        console.log("Index_Of:" + index_of);
        console.log("split_url:" + split_url);
        console.log("Current Url Is: " + current_url);
        console.log("Current Url base Is: " + current_url_base);
        console.log("Current Additional Is: " + current_url_ext);
        console.log(split_url);
        */
    }
    function displayCourses(result) {
        userGroups.push(_.uniqBy(result, 'UserGroupId')); //populate UserGroup array for lodash template filtering - not using currently
        formatResults(result);

        // [3/4/2020] Load up the global URL vars and load the drop down menus for the selections.
        loadCategories();
        loadAdditional();
        url_parse();
        renderCourses();
        // [3/4/2020] Select the current options in the URL if any.
        selectElement('categorySearch', split_url[0]);
        selectElement('additionalSearch', split_url[1]);

        $(function () {
            $(".accordion").accordion({
                collapsible: true,
                active: false,
                heightStyle: "content"
            });
        });
    }


    function courseRetrievalError(result) {
        console.log(result);
    }
}
