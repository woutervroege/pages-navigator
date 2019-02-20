import {PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `data-selector`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DataSelector extends PolymerElement {
  static get is() { return 'data-selector'; }

  static get properties() {
    return {
      
      items: {
        type: Array,
      },

      selected: {
        type: String,
        notify: true,
      },
      
      selectedItem: {
        type: Object,
        computed: '_computeSelectedItem(selected, items.splices)',
        notify: true,
      },

      parentItem: {
        type: Object,
        computed: '_computeParentItem(selectedItem.parentId)',
        notify: true,
      },

      siblings: {
        type: Array,
        computed: '_computeSiblings(selectedItem.parentId, items.splices)',
        notify: true
      },

      children: {
        type: Array,
        computed: '_computeChildren(selectedItem.id, items.splices)',
        notify: true
      }

    }
  }

  back() {
    this.selected = this.parentItem.id
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

window.customElements.define(DataSelector.is, DataSelector);