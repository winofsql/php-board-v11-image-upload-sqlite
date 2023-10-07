
$(function(){

    $(".btn-outline-dark").on("click",function(){

        var target = $(this)
        // parent.$ : 親ウインドウに対してダイアログを表示
        // modalDialog : 親ウインドウのオブジェクトを後で操作する為に保存
        var modalDialog = parent.$( "#dialog-message-delete" ).dialog({
            modal: true,
            title: "ダイアログのタイトルです",
            close: function() {
                // 親ウインドウのオブジェクトで閉じる
                modalDialog.dialog( "close" );
            },
            buttons: [
                { 
                    text: "OK",
                    click: function() {
                        // 親ウインドウのオブジェクトで閉じる
                        modalDialog.dialog( "close" );
                        entry_delete( target );
                    }
                },
                {
                    text: "キャンセル",
                    click: function() {
                        // 親ウインドウのオブジェクトで閉じる
                        modalDialog.dialog( "close" );
                    }
                }
            ]
        });

    });

});

// *************************************
// $.ajax 記事削除
// *************************************
function entry_delete( target ) {

    var id = target.prop("id");
    id = id.replace(/delete/g,"");

    var formData = new FormData();

    formData.append("id", id );

    $.ajax({
        url: "./delete.php",
        type: "POST",
        data: formData,
        processData: false,  // jQuery がデータを処理しないよう指定
        contentType: false   // jQuery が contentType を設定しないよう指定
    })
    .done(function( data, textStatus ){
        console.log( "status:" + textStatus );
        console.log( "data:" + JSON.stringify(data, null, "    ") );

        var kensu = parseInt( $("#data_head").data("kensu") );
        kensu--;
        $("#data_head").data("kensu", kensu);
        $("#data_head").text( "投稿一覧 (" + kensu + "件)" );
        
        $('#disp' + data.id).fadeOut(800);

    })
    .fail(function(jqXHR, textStatus, errorThrown ){
        console.log( "status:" + textStatus );
        console.log( "errorThrown:" + errorThrown );
    })
    .always(function() {

    })
    ;

}