import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      // this.route.snapshot.params 可以找到 path params 中的 array 
      id: this.route.snapshot.params['id'], name: this.route.snapshot.params['name']
    }
    // this.route.params.subscribe 會訂閱 params 改變時觸發
    // subscribe() has three params. first one is triggered on params change
    // subscribe() 會一直存在於 記憶體
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.user.id = params['id'];
    //     this.user.name = params['name'];
    //   }
    // );

    // 透過 paramsSubscription 讓 angular 達到 註冊與銷毀
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  // unsubscribe 在 component 銷毀時
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
