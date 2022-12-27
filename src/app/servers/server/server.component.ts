import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        // + make params type as a number
        this.server = this.serversService.getServer(+param['id']);
      }
    )
  }

  onEdit() {
    // 下面兩種寫法相同
    // this.router.navigate(['servers', this.server.id, 'edit'])
    // queryParamsHandling: preserve 會抓舊 queryParams 到新 url 上
    // queryParamsHandling: merge 會覆蓋舊 queryParams 到新 url 上
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

}
