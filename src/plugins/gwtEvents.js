/* eslint-disable */
//
// // TODO: implement dialog actions from »DialogUiFactoryInterface« and/or »DialogInterface«
//
// class DialogUiFactoryInterface {
//   create(_1, _2, title, text, options = []) {
//     let di = new DialogInterface();
//     raplaVue.$emit('gwt-dialog-open', {
//       title, text, options, di
//     })
//     return di;
//   }
// }
//
// // HACK: this is a dummy class
// class VeryBadPromise {
//   thenApply(fn) {
//     console.log("applied")
//     this.thenApplyFn = fn
//   }
// }
//
// class DialogInterface {
//
//   constructor() {
//     this.promise = new VeryBadPromise()
//   }
//
//   close() {
//     raplaVue.$emit('gwt-dialog-close')
//     this.closed = true;
//   }
//
//   isVisible() {
//     return !this.closed
//   }
//
//   start(pack) { // REVIEW: what does "pack" do?
//     // returns Promise<Integer>, where Integer = index of chosen button
//     // currentDialog.open = true
//     return this.promise
//   }
//
//   // CUSTOM
//   onChoose(index) {
//     this.promise.thenApplyFn(index)
//   }
//
//   // disabled
//   setSize(w,h) {}
//   requestFocus() {}
//   toFront() {}
//   setPosition(x,y) {}
// }
//
// window.gwtEvents = {
//   dialogUiFactoryInterface: new DialogUiFactoryInterface()
// }
//