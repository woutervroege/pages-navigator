import { UpdatingElement } from 'lit-element';

/**
 * `data-selector`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DataSelector extends UpdatingElement {

  static get properties() {
    return {
      
      items: {
        type: Array,
      },

      selected: {
        type: String,
      },
      
      selectedItem: {
        type: Object,
        attribute: 'selected-item'
      },

      parentItem: {
        type: Object,
        attribute: 'parent-item'
      },

      siblings: {
        type: Array,
      },

      children: {
        type: Array,
      }

    };
  }

  constructor() {
    super();
  }

  update() {
    this.selectedItem = {...this._computeSelectedItem(this.selected)};
    this.parentItem = {...this._computeParentItem(this.selectedItem.parentId)};
    this.siblings = [...this._computeSiblings(this.selectedItem.parentId)];
    this.children = [...this._computeChildren(this.selectedItem.id)];
  }

  updated(props) {
    if(props.has('selected')) this.dispatchEvent(new CustomEvent('selected-changed', {detail: {value: this.selected}}));
    if(props.has('selectedItem')) this.dispatchEvent(new CustomEvent('selected-item-changed', {detail: {value: this.selectedItem}}));
    if(props.has('parentItem')) this.dispatchEvent(new CustomEvent('parent-item-changed', {detail: {value: this.parentItem}}));
    if(props.has('siblings')) this.dispatchEvent(new CustomEvent('siblings-changed', {detail: {value: this.siblings}}));
    if(props.has('children')) this.dispatchEvent(new CustomEvent('children-changed', {detail: {value: this.children}}));
  }

  back() {
    this.selected = this.parentItem.id;
  }

  _computeSelectedItem(selected) {
    return this.items.find((item) => {
      return item.id == selected;
    }) || {};
  }
 
  _computeParentItem(parentId) {
    return this.items.find((item) => {
      return item.id == parentId;
    }) || {};
  }

  _computeSiblings(selectedItemParentId) {
    return this.items.filter((item) => {
      return item.parentId == selectedItemParentId;
    });
  }
  
  _computeChildren(selectedItemId) {
    return this.items.filter((item) => {
      return item.parentId == selectedItemId;
    });
  }

}

window.customElements.define('data-selector', DataSelector);