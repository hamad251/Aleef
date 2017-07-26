import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Http} from '@angular/http';

import {Storage} from '@ionic/storage';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // display slides
  public displaySlides: boolean = false;
  public displayLatest: boolean = false;
  public displaySpecial: boolean = false;
  public displayBest: boolean = false;
  public displayFeatured: boolean = false;

  // list of items
  public items: any;
  public slides: any;
  public latestProducts: any;
  public specialProducts: any;
  public bestsellersProducts: any;
  public featuredProducts: any;

  constructor(public storage: Storage, public nav: NavController,  public http: Http) {
    this.getSlides();
    this.getLatestProducts();
    this.getSpecialsProducts();
    this.getBestsellersProducts();
    this.getFeaturedProducts();
  }

  // view categories
  viewCategories() {
    // this.nav.push(CategoriesPage);
  }

  // view a category
  viewCategory(category) {
    // this.nav.push(CategoryPage, {category: category});
  }

  // view a item
  viewItem(item) {
    // this.nav.push(ItemPage, {item: item})
  }

  // go to search page
  goToSearch() {
    // this.nav.push(SearchPage);
  }

  // view cart
  goToCart() {
    // this.nav.setRoot(CartPage);
  }


  getSlides() {
    this.slideRequest();

    this.storage.get('home_slides').then((slides) => {
      if (slides) {
        this.slides = slides;
        this.displaySlides = true;
        this.slideRequest();
      } else {
        this.slideRequest();
      }
    });


  }

  slideRequest() {
    this.http.get('https://aleef.com/api/rest/banners/11')
        .map(res => res.json())
        .subscribe(
            data => {
              //  console.log(data);
              if (data.success) {

                if (JSON.stringify(this.slides) !== JSON.stringify(data.data)) {
                  this.slides = data.data;
                  this.displaySlides = true;
                  //    this.storage.set('home_slides', data.data);
                } else {
                  this.displaySlides = true;
                }

              }
            },
            err => console.log(err)
        );
  }


  getLatestProductsRequest() {

    this.http.get('https://aleef.com/index.php?route=feed/rest_api/latest&limit=4')
        .map(res => res.json())
        .subscribe(
            data => {
              //   console.log("latest", data);
              if (data.success) {

                if (JSON.stringify(this.latestProducts) !== JSON.stringify(data.data)) {
                  this.latestProducts = data.data;
                  this.displayLatest = true;
                  this.storage.set('home_latest', data.data);
                } else {
                  this.displayLatest = true;
                }
                this.storage.set('home_latest', data.data);
              }
            },
            err => console.log("latest",err)
        );


  }

  getLatestProducts() {


    this.storage.get('home_latest').then((items) => {
      if (items) {
        this.latestProducts = items;
        this.displayLatest = true;
        this.getLatestProductsRequest();
      } else {
        this.getLatestProductsRequest();
      }
    });


  }

  getSpecialsProducts() {
    this.http.get('https://aleef.com/index.php?route=feed/rest_api/specials&limit=4')
        .map(res => res.json())
        .subscribe(
            data => {
              //    console.log("special", data);
              if (data.success) {
                this.specialProducts = data.data;
                this.displaySpecial = true;
              }
            },
            err => console.log(err)
        );
  }


  getFeaturedProducts() {
    this.http.get('https://aleef.com/index.php?route=feed/rest_api/featured&limit=10')
        .map(res => res.json())
        .subscribe(
            data => {
              //   console.log("featured", data);
              if (data.success) {
                this.featuredProducts = data.data;
                this.displayFeatured = true;
              }
            },
            err => {
              this.displayFeatured = false;

            }
        );
  }



  getBestsellersProducts() {
    this.http.get('https://aleef.com/index.php?route=feed/rest_api/bestsellers&limit=4')
        .map(res => res.json())
        .subscribe(
            data => {
              //  console.log("Best", data);
              if (data.success) {
                this.bestsellersProducts = data.data.products;
                this.displayBest = true;
              }
            },
            err => console.log(err)
        );
  }


  goTo(type) {
    switch (type) {
      case 'latest': {
        // this.nav.push(LatestProducts);
        break;
      }
      case 'special': {
        // this.nav.push(SpecialProducts);
        break;
      }
      case 'bestseller': {
        // this.nav.push(BestsellerProducts);
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }


  goToCats() {
    // this.nav.push(CategoriesPage);
  }

}
