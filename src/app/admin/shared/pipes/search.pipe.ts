import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../../shared/interfaces";

@Pipe({
  name: 'searchPost'
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search: string = ''): Post[] {
    return search.trim()
      ? posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
      : posts
  }

}
