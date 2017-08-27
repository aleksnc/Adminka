function show(x) {
    switch (x) {
        case 'events':
            $('.events__list').show();
            $('.events__addW').hide();
            $('.adress__addW').hide();
            $('.adress__list').hide();

            break

        case 'addEvent':
            $('.events__list').hide();
            $('.events__addW').show();
            $('.adress__addW').hide();
            $('.adress__list').hide();
            break

        case 'adress':
            $('.events__list').hide();
            $('.events__addW').hide();
            $('.adress__addW').hide();
            $('.adress__list').show();
            break

        case 'addAdress':
            $('.events__list').hide();
            $('.events__addW').hide();
            $('.adress__addW').show();
            $('.adress__list').hide();
            break
    }
}

function allGet(data, theme) {



    var lengthData = data.length;

    //console.log(data);
    //console.log(theme);
    //console.log(lengthData);


    if (theme == 'events') {
        console.log('lengthData');
         $(".events__listLink:not(.parent)").remove();

        for (var i = 0; i < lengthData; i++) {
            //console.log('test:'+i);

            $(".events__listLink.parent").clone()
                .appendTo(".events__listBlock")
                .removeClass('parent')
                .addClass('child' + i);

            $(".events__listLink.child" + i).find(".events__listContent")
                .empty()
                .html(data[i].pagetitle);

            $(".events__listLink.child" + i).attr("data-id", data[i].id);

            if (data[i].published != 0) {
                $(".events__listLink.child" + i).find("input").prop('checked', true)
            }
        }
    }

    if (theme == 'adress') {

         $(".adress__listLink:not(.parent)").remove();
        for (var i = 0; i < lengthData; i++) {
            $(".adress__listLink.parent").clone()
                .appendTo(".adress__listBlock")
                .removeClass('parent')
                .addClass('child' + i);
            $(".adress__listLink.child" + i).find(".adress__listContent")
                .empty()
                .attr("data-id", data[i].id)
                .html(data[i].pagetitle);

            if (data[i].published != 0) {
                $(".adress__listLink.child" + i).find("input").prop('checked', true)
            }
        }
    }
}

//function getBlock(theme) {
//    var url = 'rest/manage/' + theme + '/';
//
//   if (arguments.length > 1) {
//        if ($.isNumeric(arguments[1])) {
//            var urlId = (arguments[1]);
//
//            url = 'rest/manage/' + theme + '/' + urlId;
//        }
//    }
//    $.ajax({
//        type: "GET",
//        url: url,
//        dataType: 'text',
//        success: function (data) {
//
//            if (arguments.length > 1) {
//                if ($.isNumeric(arguments[1])) {
//
//                    if (theme == 'events') {
//                        // $('.events__list').hide();
//                        $('.events__addW').show();
//                        $('.events__btn.save').hide();
//                        $('.events__btn.update').show();
//                        $('.events__title')
//                            .empty()
//                            .html(data.pagetitle);
//                        $('.events__description')
//                            .empty()
//                            .html(data.content);
//                        $('.events__data.start')
//                            .empty()
//                            .html(data.pud__date);
//                        $('.events__data.end')
//                            .empty()
//                            .html(data.unpub__date);
//                        $('.events__adress')
//                            .empty();
//                        var myOption = data.londtitle;
//                        var optionLength = myOption.length;
//                        for (var i = 0; i < optionLength; i++) {
//                            $('.events__adress').append(
//                                '<option val=""' + myOption[i].id + '>myOption[i].longtitle </option>'
//                            )
//                        }
//                    }
//
//                    if (theme == 'adress') {
//                        $('.adress__addW').show();
//                        $('.adress__btn.save').hide();
//                        $('.adress__btn.update').show();
//                        $('.events__title')
//                            .empty()
//                            .html(data.pagetitle);
//                    }
//                }
//            } else {
//                allGet(data, theme)
//            }
//
//        }
//    });
//}


function getBlock(theme) {

    var url = 'rest/manage/' + theme + '/';
    var tooglePath =0;
    if (arguments.length > 1) {
        if ($.isNumeric(arguments[1])) {
            tooglePath=1;
            var urlId = (arguments[1]);
            url = 'rest/manage/' + theme + '/' + urlId

        }
    }

    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'text',
        success: function (data) {
            data = JSON.parse(data);
            var dataNew = data.results;

            if (tooglePath > 0) {
                console.log('dataNew: '+dataNew);
                if (theme == 'events') {
                        // $('.events__list').hide();
                        $('.events__addW').show();
                        $('.events__btn.save').hide();
                        $('.events__btn.update').show();
                        $('.events__title')
                            .empty()
                            .html(dataNew.pagetitle);
                        $('.events__description')
                            .empty()
                            .html(dataNew.content);
                        $('.events__data.start')
                            .empty()
                            .html(dataNew.pud__date);
                        $('.events__data.end')
                            .empty()
                            .html(dataNew.unpub__date);
                        $('.events__adress')
                            .empty();

                        var longtitle = dataNew[0].longtitle;
                  //  console.log( );
                    var myOption =JSON.parse(longtitle);
                        console.log(myOption);
                        console.log(myOption[0].longtitle);
                        var optionLength = myOption[0].length;
                        for (var i = 0; i < optionLength; i++) {
                            $('.events__adress').append(
                                '<option val=""' + myOption[i].id + '>myOption[i].longtitle </option>'
                            )
                        }
                    }

                    if (theme == 'adress') {
                        $('.adress__addW').show();
                        $('.adress__btn.save').hide();
                        $('.adress__btn.update').show();
                        $('.events__title')
                            .empty()
                            .html(data.pagetitle);
                    }

            } else {
                console.log("dddd");
                allGet(dataNew, theme)
            }

        }
    });
}

function postBlock(myJSON, theme) {

    var url = 'rest/manage/' + theme + '/';

    $.ajax({
        type: "POST",
        url: url,
        dataType: 'text',
        data: myJSON,
        success: function (data) {
            if (theme == 'events') {
                getBlock('events')
            }
            if (theme == 'adress') {
                getBlock('adress')
            }
        }
    });
}

function putBlock(myJSON, theme, myId) {
    var url = 'rest/manage/' + theme + '/' + myId;

    $.ajax({
        type: "PUT",
        url: url,
        dataType: 'text',
        data: myJSON,
        success: function (data) {
            if (theme == 'events') {
                var ThisParent = $('.events__addW');
                var ThisAdress = ThisParent.find('.events__adress').empty();
                var ThisTitle = ThisParent.find('.events__title').empty();
                var ThisDescription = ThisParent.find('.events__description').empty();
                var ThisDatePud = ThisParent.find('.events__data.start').empty();
                var ThisDateUnPud = ThisParent.find('.events__data.end').empty();
                getBlock('events')
            }
            if (theme == 'adress') {
                var ThisParent = $('.adress__addW');
                var ThisAdress = ThisParent.find('.adress').empty();
                var ThisDescription = ThisParent.find('.adress.description').empty();
                var ThisTitle = ThisParent.find('.adress.name').empty();
                var ThisLa = ThisParent.find('.adress__coord.la').empty();
                var ThisLo = ThisParent.find('.adress__coord.lo').empty();

                getBlock('adress')
            }
        }
    });
}

$(document).ready(function () {
    getBlock('events')
    $('.sidebar__block').click(function () {
        $(this).find('.sidebar__Menu--subMenu').slideToggle();
    })


    //публиковать событие

    $('.events__btn.save').click(function () {
        var ThisParent = $(this).parent();
        var ThisAdress = ThisParent.find('.events__adress').val();
        var ThisTitle = ThisParent.find('.events__title').val();
        var ThisDescription = ThisParent.find('.events__description').val();
        var ThisDatePud = ThisParent.find('.events__data.start').val();
        var ThisDateUnPud = ThisParent.find('.events__data.end').val();

        var ThisData = {
            "pagetitle": ThisTitle,
            "content": ThisDescription,
            "longtitle": ThisAdress,
            "pud__date": ThisDatePud,
            "unpub__date": ThisDateUnPud
        }

        postBlock(ThisData, 'events')
    })

//получить одно событие
    $(document).on('click','.events__listContent', function () {

        var ThisId = $(this).parent('.events__listLink').data('id');

        console.log(ThisId);

        getBlock('events', ThisId);
    })

//обновить событие
    $('.events__btn.update').click(function () {
        var ThisParent = $(this).parent();
        var ThisId = ThisParent.find('.events__adress').data("id");
        var ThisAdress = ThisParent.find('.events__adress').val();
        var ThisTitle = ThisParent.find('.events__title').val();
        var ThisDescription = ThisParent.find('.events__description').val();
        var ThisDatePud = ThisParent.find('.events__data.start').val();
        var ThisDateUnPud = ThisParent.find('.events__data.end').val();

        var ThisData = {
            "pagetitle": ThisTitle,
            "content": ThisDescription,
            "id": ThisId,
            "longtitle": ThisAdress,
            "pud__date": ThisDatePud,
            "unpub__date": ThisDateUnPud
        }
        putBlock(ThisData, 'events', ThisId)
    })


//публиковать адрес
    $('.adress__btn.save').click(function () {
        var ThisParent = $(this).parent();
        var ThisAdress = ThisParent.find('.adress').val();
        var ThisDescription = ThisParent.find('.adress.description').val();
        var ThisTitle = ThisParent.find('.adress.name').val();
        var ThisLa = ThisParent.find('.adress__coord.la').val();
        var ThisLo = ThisParent.find('.adress__coord.lo').val();

        var ThisData = {
            "pagetitle": ThisTitle,
            "content": ThisDescription,
            "longtitle": ThisAdress,
            "introtext": ThisLa,
            "description": ThisLo,
        }
        postBlock(ThisData, 'adres')
    })

//получить один адрес
    $(document).on('click', '.adress__listContent', function () {
        var ThisId = $(this).parent().data('id');
        console.log(ThisId);
        getBlock('adress', ThisId);
    })
//обновить адрес

    $('.adress__btn.update').click(function () {
        var ThisParent = $(this).parent();
        var ThisTitle = ThisParent.find('.adress.name').val();
        var ThisDescription = ThisParent.find('.adress.description').val();
        var ThisId = ThisParent.find('.adress__add').data("id");
        var ThisAdress = ThisParent.find('.adress').val();
        var ThisLa = ThisParent.find('.adress__coord.la').val();
        var ThisLo = ThisParent.find('.adress__coord.lo').val();

        var ThisData = {
            "pagetitle": ThisTitle,
            "content": ThisDescription,
            "id": ThisId,
            "longtitle": ThisAdress,
            "introtext": ThisLa,
            "description": ThisLo,
        }
        putBlock(ThisData, 'adress', ThisId)
    })

//публиковать адрес

    $(document).on('change', '.adress__public input', function () {
        var ThisChecked = ($(this).prop('checked')) ? 1 : 0;
        var ThisId = $(this).parent('.adress__listLink').data('id');

        var ThisData = {
            "id": ThisId,
            "published": ThisChecked
        }

        postBlock(ThisData, 'adress', ThisId)
    })

//публиковать событие

    $(document).on('change', '.events__public input', function () {
        var ThisChecked = ($(this).prop('checked')) ? 1 : 0;
        var ThisId = $(this).parent('.events__listLink').data('id')

        var ThisData = {
            "id": ThisId,
            "published": ThisChecked
        }
        postBlock(ThisData, 'events', ThisId)
    })


})


