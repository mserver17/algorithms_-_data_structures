import { RBTree } from "./tree.js";
import { TreeVisualizer } from "./visualizer.js";
class RedBlackTreeApp {
  constructor() {
    this.tree = new RBTree();
    this.visualizer = new TreeVisualizer(document.getElementById("treeCanvas"));
    this.initializeEventHandlers();
    this.updateVisualization();
  }

  initializeEventHandlers() {
    document
      .getElementById("insertBtn")
      .addEventListener("click", () => this.handleInsert());
    document
      .getElementById("removeBtn")
      .addEventListener("click", () => this.handleRemove());
    document.getElementById("inputValue").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleInsert();
    });
  }

  handleInsert() {
    const value = this.getInputValue();
    if (!this.validateInput(value)) return;

    this.tree.insert(parseInt(value, 10));
    this.updateVisualization();
  }

  handleRemove() {
    const value = this.getInputValue();
    if (!this.validateInput(value)) return;

    this.tree.delete(parseInt(value, 10));
    this.updateVisualization();
  }

  getInputValue() {
    const inputElement = document.getElementById("inputValue");
    const value = inputElement.value.trim();
    inputElement.value = "";
    return value;
  }

  validateInput(value) {
    if (!/^-?\d+$/.test(value)) {
      this.showError("Допустимы только целые числа");
      return false;
    }
    return true;
  }

  showError(message) {
    const errorElement = document.getElementById("error");
    errorElement.textContent = message;
    setTimeout(() => (errorElement.textContent = ""), 3000);
  }

  updateVisualization() {
    this.visualizer.draw(this.tree);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new RedBlackTreeApp();
});
