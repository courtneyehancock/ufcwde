function getXMSConferences(ConfType, ugID, Scope) {
    try{
        if ($.QueryString["lt"].toNumber() == 0) {
            ConfType = 0;
        }
    } catch (err) { }

    var apiUrl = 'https://secure.aa.ufl.edu/DCE/DCEData/XMS/Conferences/List/' + ugID + '/' + Scope + '/' + ConfType + '/';
    //var apiUrl = 'XMS/Courses/List/' + ugID + '/' + progID + '/';
    $.jsonp({
        url: apiUrl,
        dataType: 'jsonp',
        callbackParameter: 'callback',
        timeout: 15000,
        success: function (data) {
            if (data.length > 0) {
                var conflink = '';
                $.each(data, function (i, val) {
                    conflink = '<tr><td><a href="' + val.RegUrl + '">' + val.Title + '</a></td><td>' + val.EventDateRange + '</td></li>';
                    $('#tblConfList').append(conflink);
                });
            }
            //try{
            //    onComplete(progID);
            //} catch (err) { }
        },
        error: function (XHR, textStatus) {
        }
    });
}

function getXMSConferencesSSP(ConfType, ugID, Scope) {
    try {
        if ($.QueryString["lt"].toNumber() == 0) {
            ConfType = 0;
        }
    } catch (err) { }

    var apiUrl = 'https://secure.aa.ufl.edu/DCE/DCEData/XMS/Conferences/List/' + ugID + '/' + Scope + '/' + ConfType + '/';
    //var apiUrl = 'XMS/Courses/List/' + ugID + '/' + progID + '/';
    $.jsonp({
        url: apiUrl,
        dataType: 'jsonp',
        callbackParameter: 'callback',
        timeout: 15000,
        success: function (data) {
            if (data.length > 0) {
                var conflink = '';
                $.each(data, function (i, val) {
                    conflink = '<tr><td><a href="' + val.RegUrl + '">' + val.Title + '</a></td><td>' + val.EventDateRange + '</td></li>';
                    $('#tblConfListSSP').append(conflink);
                });
            }
            //try{
            //    onComplete(progID);
            //} catch (err) { }
        },
        error: function (XHR, textStatus) {
        }
    });
}

function redirect() {
    window.location.replace("pagenotfound.htm");
}
