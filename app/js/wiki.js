 // function WikiSearchdata(search) {  
 //     $j.ajax({  
 //         type: "GET",  
 //         url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + search + "&callback=?",  
 //         contentType: "application/json; charset=utf-8",  
 //         async: false,  
 //         dataType: "json",  
 //         success: function(data, textStatus, jqXHR) {  
 //            console.log(data);
 //             $j.each(data, function(i, item) {  
 //                 if (i == 1) {  
 //                     var searchdata = item[0];  
 //                     searchwiki(searchdata);  
 //                 }  
 //             });  
 //         },  
 //     error: function(errorMessage) {  
 //     }  
 //    });  
 // }  
   
 // function searchwiki(search) {  
 //     $j.ajax({  
 //     type: "GET",  
 //     url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text§ion=0&page=" + search + "&callback=?",  
 //     contentType: "application/json; charset=utf-8",  
 //     async: false,  
 //     dataType: "json",  
 //     success: function(data, textStatus, jqXHR) {  
 //            console.log(data);   
 //         var markup = data.parse.text["*"];  
 //         var blurb = $j('<div></div>').html(markup);  
 //         blurb.find('a').each(function() { $j(this).replaceWith($j(this).html()); });  
 //         blurb.find('sup').remove();  
 //         blurb.find('.mw-ext-cite-error').remove();  
 //         $j('#results').html(blurb);  
 //         },  
 //     error: function(errorMessage) {  
 //     }  
 //     });  
 // }  