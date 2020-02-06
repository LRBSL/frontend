import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit() {
    $(document).ready(function(){
      // $("a").on('click', function(event) {
      //   console.log("Hello")
      //   if (this.hash !== "") {
      //     event.preventDefault();
      //     var hash = this.hash;
      //     $('html, body').animate({
      //       scrollTop: $(hash).offset().top
      //     }, 800, function(){
      //       window.location.hash = hash;
      //     });
      //   }
      // });
    });

    // $(".nav .nav-link").on("click", function () {
    //   $(".nav").find(".active").removeClass("active");
    //   $(this).addClass("active");
    // }).ready(function () {
    //   $(".nav").find(".active").removeClass("active");
    //   $("#home-nav-item").addClass("active");
    // });
  }
}
