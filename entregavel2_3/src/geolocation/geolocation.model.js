class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  getAt(index) {
    if (index < 0 || index >= this.size) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  setAt(index, data) {
    if (index < 0 || index >= this.size) return false;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    current.data = data;
    return true;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) return false;
    if (index === 0) {
      this.head = this.head.next;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      current.next = current.next.next;
    }
    this.size--;
    return true;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  toArrayReversed() {
    return this.toArray().reverse();
  }
}

export class GeolocationModel {
  constructor() {
    this.linkedList = new LinkedList();
  }

  getAll() {
    return this.linkedList.toArray();
  }

  getAllReversed() {
    return this.linkedList.toArrayReversed();
  }

  getAt(index) {
    return this.linkedList.getAt(index);
  }

  add(coords) {
    this.linkedList.append(coords);
  }

  updateAt(index, coords) {
    return this.linkedList.setAt(index, coords);
  }

  patchAt(index, partialCoords) {
    const current = this.linkedList.getAt(index);
    if (!current) return false;
    const updated = { ...current, ...partialCoords };
    return this.linkedList.setAt(index, updated);
  }

  removeAt(index) {
    return this.linkedList.removeAt(index);
  }

  getSize() {
    return this.linkedList.size;
  }

  findClosest(latitude, longitude) {
    const list = this.linkedList.toArray();
    if (list.length === 0) return null;

    let closest = null;
    let minDistance = Infinity;

    list.forEach((coord, index) => {
      const distance =
        Math.abs(coord.latitude - latitude) +
        Math.abs(coord.longitude - longitude);
      if (distance < minDistance) {
        minDistance = distance;
        closest = { index, coord, distance };
      }
    });

    return closest;
  }
}
