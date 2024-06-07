export class Note {
    constructor(id, content, labels = [], color = 'white', isBookmarked = false) {
      this.id = id;
      this.content = content;
      this.labels = labels;
      this.color = color;
      this.isBookmarked = isBookmarked;
      this.isInTrash = false;
    }
  }
  