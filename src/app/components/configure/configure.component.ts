import { kindWords, Sentence } from 'kind-words';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.sass']
})
export class ConfigureComponent implements OnInit {

  displayedColumns: string[] = ['sentence', 'createdAt', 'actions'];

  public fetching: boolean = false;
  public saving: boolean = false;
  public sentences: Sentence[] = [];
  public sentence: string = "";

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
      console.log(err);
    }
    this.fetching = false;
  }

  public async onAddSentence() {
    this.saving = true;
    try {
      const sentence = await kindWords.createKindWord(this.sentence);
      this.sentences.push(sentence);
      this.dataSource.data = this.sentences;
      this.sentence = "";
    } catch (err) {
      console.log(err);
    }
    this.saving = false;
  }

  public async onRemoveSentence(sentence: Sentence) {
    this.saving = true;
    try {
      // TODO remove the sentence from the server

      this.sentences = this.sentences.filter(x => x.id !== sentence.id);
      this.dataSource.data = this.sentences;
    } catch (err) {
      console.log(err);
    }
    this.saving = false;
  }
}
