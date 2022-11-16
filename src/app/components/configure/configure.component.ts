import { kindWords, Sentence } from 'kind-words';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.sass']
})
export class ConfigureComponent implements OnInit {

  displayedColumns: string[] = ['sentence', 'createdAt'];

  public fetching: boolean = false;
  public saving: boolean = false;
  public sentences: Sentence[] = [];
  public kindWord: string = "";

  public dataSource = new MatTableDataSource<Sentence>();

  ngOnInit(): void {
    this.fetchKindWords();
  }

  private async fetchKindWords() {
    this.fetching = true;
    try {
      this.sentences = await kindWords.fetchKindWords();
      this.dataSource.data = this.sentences;
    } catch (err) {
      // TODO: handle this
    }
    this.fetching = false;
  }

  public async onAddKindWord() {
    this.saving = true;
    try {
      const sentence = await kindWords.createKindWord(this.kindWord);
      this.sentences.push(sentence);
      this.dataSource.data = this.sentences;
      this.kindWord = "";
    } catch (err) {
      // TODO: handle this
    }
    this.saving = false;
  }
}
