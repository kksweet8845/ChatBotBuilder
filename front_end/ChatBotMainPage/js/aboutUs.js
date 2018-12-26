jQuery(document).ready(() => {
    $(window).scroll(()=>{
      if($(this).scrollTop() != 0){
        $('.navbar').addClass('pink');
      }else {
        $('.navbar').removeClass('pink');
      }
    });

    
    $('#member1').on('mouseenter',(event) => {
        var content = $(event.target).children(".member_content");
        console.log(content);
        showup(content);  
    });
    $('#member1').on('mouseleave',()=>{
        var content = "#member1 .member_content";
        showoff(content);
    });
    $('#member2').on('mouseenter',()=> {
        var content = "#member2 .member_content";
        showup(content);
    });
    $('#member2').on('mouseleave',()=> {
        var content = "#member2 .member_content";
        showoff(content);
    });


    $('#member3').on('mouseenter',()=> {
        var content = "#member3 .member_content";
        showup(content);
    });
    $('#member3').on('mouseleave',()=> {
        var content = "#member3 .member_content";
        showoff(content);
    });


    $('#member4').on('mouseenter',()=> {
        var content = "#member4 .member_content";
        showup(content);
    });
    $('#member4').on('mouseleave',()=> {
        var content = "#member4 .member_content";
        showoff(content);
    });


    $('#member5').on('mouseenter',()=> {
        var content = "#member5 .member_content";
        showup(content);
    });
    $('#member5').on('mouseleave',()=> {
        var content = "#member5 .member_content";
        showoff(content);
    });

  function showup(e) {
      $(e).animate({
        opacity: 1,
        height: +100
      },500,()=>{
        console.log('finished'); 
      });
  
  }

  function showoff(e) {
      $(e).animate({
          height: 0,
          opacity: 0
      },500,() => console.log('off finished'));
  
  }


});
