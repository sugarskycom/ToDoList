/**
 * Created by Administrator on 2017/4/28.
 */
var vm = new Vue({
    el : '#app',
    data : {
        todos : [],
        editTodo : '',
        state : '',
        currentTodo : ''
    },
    methods:{
        addTodo(){
       this.todos.push({titles:this.editTodo,isChecked:false});
       this.editTodo = '';
      },
        changeTitle(todo){
          return this.currentTodo = todo;
        },
        remove(todo){
          this.todos = this.todos.filter(function (item) {
              return todo != item;
          });
        },
        reset(){
            this.currentTodo = '';
        }
    },
    directives:{
        autoFocus(ele,bindings){
            if(bindings.value){
                ele.focus();
            }
        }
    },
    watch:{
      todos:{
          handler(){
            localStorage.setItem('todos',JSON.stringify(this.todos));
          },
          deep:true
      }
    },
    mounted(){
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    computed:{
        cloneTodo(){
            if(this.state=='complete'){
                return this.todos;
            }
            if(this.state=='finish'){
                return this.todos.filter(function (item) {
                   return item.isChecked;
                });
            }
            if(this.state=='unfinish'){
                return this.todos.filter(function (item) {
                    return !item.isChecked;
                });
            }
        },
        total(){
           return this.todos.filter(function (item) {
                return !item.isChecked;
            }).length;
        }
    }
});
var listener = function () {
    vm.state = window.location.hash.slice(1) || 'complete';
};
listener();
window.addEventListener('hashchange',listener,false);