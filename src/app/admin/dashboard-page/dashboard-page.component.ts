import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from "../../shared/post.service";
import { Post } from "../../shared/interfaces";
import { Subscription } from "rxjs";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSub: Subscription;
  removeSub: Subscription;
  searchStr: string = '';

  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.postsSub = this.postService.getAll().subscribe(posts => this.posts = posts);
  }

  remove(id: string) {
    this.removeSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id);
      this.alertService.danger('Post has been removed!');
    });
  }

  ngOnDestroy(): void {
    if (this.postsSub) this.postsSub.unsubscribe();

    if (this.removeSub) this.removeSub.unsubscribe();
  }
}
