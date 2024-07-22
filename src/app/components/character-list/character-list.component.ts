import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  convertToParamMap,
} from '@angular/router';
import { filter, take } from 'rxjs';
import { Character } from 'src/app/character.inferface';
import { CharacterService } from 'src/app/services/character.service';
import { Router } from '@angular/router';

import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next: string;
};
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  info: RequestInfo = {
    next: '',
  };
  showGoUpButton = false;

  private pageNum = 1;

  private query: string = '';

  private hideScrollHeight = 200;

  private showScrollHeight = 500;

  constructor(
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    //this.getDataFromService();
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll',[])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if (
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showGoUpButton = false;
    }
  }
  onScrollDown(): void {
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }
  onScrollTop(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }
  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void {
    //route
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      console.log(params);
      this.query = params['s'];
      this.getDataFromService();
    });
    //   .subscribe(
    //   ((params : ParamMap) =>{
    //     this.query = params.get('s');
    //     this.getDataFromService();
    //   })
    //  )
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.results.length) {
          const { info, results } = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = [];
        }
      });
  }
}
