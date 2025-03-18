
var atx = {
    ajax_url: js_base + 'ajax/',
    ajaxCustom: function (url, data, callback, callback_custom_variable_1)
    {
        $.ajax({
            url: url,
            data: data,
            method: 'POST',
            async: true,
            success: function (ret) {
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(ret, callback_custom_variable_1);
                    } else
                    {
                        callback(ret);
                    }
                }
            },
            error: function (err) {
               //alert('Error, Please try again later');
            }
        });
    },
    showNotification: function (message, type) {
        var from = 'top';
        var align = 'center';
        $.notify({
            icon: "notifications",
            message: message
        }, {
            type: type,
            timer: 6000,
            placement: {
                from: from,
                align: align
            }
        });
    },
    addEditor: function (id, height)
    {
        var height1 = 200;
        if (typeof height !== 'undefined')
        {
            height1 = height
        }

        if ($('#' + id).length > 0)
        {
            CKEDITOR.replace(id, {
                height: height1
            });
            CKEDITOR.config.forcePasteAsPlainText = true;

            CKEDITOR.config.allowedContent = true;
            CKEDITOR.config.pasteFromWordRemoveFontStyles = false;
            CKEDITOR.config.pasteFromWordRemoveStyles = false;
            CKEDITOR.dtd.$removeEmpty['span'] = false;

            CKEDITOR.config.toolbar = [
                ['Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'StrikeThrough', 'NumberedList', 'BulletedList', 'Link']
            ];
        }
    },
    trim_custom: function (str) {
        str = str.replace(/^\s+/, '');
        for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    }
}

$("#rForm").validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true
        },
        lname: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            maxlength: 10,
        },
        message: {
            required: true
        },
        inquiry: {
            required: true
        },
    },
    messages: {
        fname: {
            required: "Enter first name."
        },
        lname: {
            required: "Enter last name."
        },
        email: {
            required: "Enter a valid email address."
        },
        phone: {
            required: "Enter your contact number."
        },
        message: {
            required: "Enter message."
        },
        inquiry: {
            required: "Select enter message."
        }
    },
    submitHandler: function (form)
    {
        $(form).fadeOut('fast');
        $('.contact-msg').fadeOut('fast');
        $('.se-pre-con').css('display','');
        var data = $(form).serialize();
        
        atx.ajaxCustom(js_base + 'ajax/contact_submit', data, function () {
            $('.success-msg').html('<p>We have received your contact inquiry, someone from our office will get back to you soon.</p>')
            //result = JSON.parse(atx.trim_custom(result));
            //atx.showNotification(result.message, result.type);
        });
         $('.success-msg').html('<p>We have received your contact inquiry, someone from our office will get back to you soon.</p>')
       $('.se-pre-con').css('display','none');
    }
});

$("#rpForm").validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true
        },
        lname: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            maxlength: 10,
        },
        message: {
            required: true
        },
        inquiry: {
            required: true
        },
    },
    messages: {
        fname: {
            required: "Enter first name."
        },
        lname: {
            required: "Enter last name."
        },
        email: {
            required: "Enter a valid email address."
        },
        phone: {
            required: "Enter your contact number."
        }
    },
    submitHandler: function (form)
    {
        $(form).fadeOut('fast');
        $('.se-pre-con').css('display','');
        var data = $(form).serialize();
        atx.ajaxCustom(js_base + 'ajax/inq_submit', data, function () {
            $('.success-msg').html('<p>We have received your inquiry, someone from our office will get back to you soon.</p>')
            //result = JSON.parse(atx.trim_custom(result));
            //atx.showNotification(result.message, result.type);
        });
        $('.success-msg').html('<p>We have received your inquiry, someone from our office will get back to you soon.</p>')
        $('.se-pre-con').css('display','none');
    }
});