<template>
    <div class="container">
        <div class="row" mt-5>
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Users Table</h3>

              <div class="card-tools">
                <button class="btn btn-success" @click="newModal">
                    Add New <i class="fas fa-user-plus fa-fw"></i> </button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="card-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody><tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered At</th>
                  <th>Modify</th>
                </tr>
                <tr v-for="user in users" :key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.name|upText}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.type|upText}}</td>
                  <td>{{user.created_at|myDate}}</td>
                  <a href="#" @click="editModal(user)"><i class="fa fa-edit blue"> </i></a> /
                  <a href="#" @click="deleteUser(user.id)"><i class="fa fa-trash red" ></i></a>
                                 
                   </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
      </div>
<!--modal start-->

<!-- Modal -->
<div class="modal fade" id="addNew" tabindex="-1" role="dialog" 
aria-labelledby="addNewLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 v-show="!editMode" class="modal-title" id="addNewLabel">New User</h5>
        <h5 v-show="editMode" class="modal-title" id="addNewLabel">Edit User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
<!--start of modal body-->
      
      <div class="modal-body">
      <form @submit.prevent="editMode ? updateUser():createUser()">
      
       
              <div class="form-group">
               
                <input v-model="form.name" type="text" name="name" placeholder="Name"
                  class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                <has-error :form="form" field="name"></has-error>
              </div>
                      
              <div class="form-group">
                  <input type="email" v-model="form.email" name="email" placeholder="Email"
                 class="form-control" :class="{'is-invalid':form.errors.has('email')}">
                <has-error :form="form" field="email"></has-error>
              </div>
              <div class="form-group">
                 <input v-model="form.password" type="password" name="password" placeholder="Password"
                  class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                <has-error :form="form" field="password"></has-error>
              </div>
              <div class="form-group">
                 <input v-model="form.photo" type="photo" name="photo" placeholder="Photo"
                  class="form-control" :class="{ 'is-invalid': form.errors.has('photo') }">
                <has-error :form="form" field="photo"></has-error>
              </div>

              <div class="form-group">
                  <textarea v-model="form.bio" name="bio" placeholder="About U"
                 class="form-control" :class="{'is-invalid':form.errors.has('bio')}"> </textarea>
                <has-error :form="form" field="bio"></has-error>
              </div>
               <div class="form-group">
                  <select name="type" v-model="form.type" id="type" class="form-control"
                  :class="{'is-invalid':form.errors.has('type')}">
                  <option value="">Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  </select><has-error :form="form" field="type"></has-error>
              </div>
        
       <!--/modal body-->       
          <div class="modal-footer">
            <button  type="submit" v-show="!editMode"  class="btn btn-primary">Create</button>
            <button type="submit"  v-show="editMode" class="btn btn-primary">Update</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
    </form> 
     </div>
    </div>
    
  </div>
</div>

    </div>
</template>

<script>
import { Form, HasError, AlertError } from "vform";
export default {
  data() {
    return {
      editMode:false,
      users: {},
      form: new Form({
        id:'',
        name: "",
        password: "",
        email: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  methods: {
    updateUser(){
      this.$Progress.start();
        this.form.put('api/user/'+this.form.id)
        .then(()=>{
            //success
        swal(
                'Updated!',
                'User Updated',
                'success'
            )
            $("#addNew").modal("hide");
        this.$Progress.finish();
         Fire.$emit('AfterCreate');
          }).catch(
      ()=>{
    this.$Progress.fail();
      });

    },       
        editModal(user){
            this.editMode=true;
            this.form.reset();
            $("#addNew").modal("show");
            this.form.fill(user)
        },
         newModal(){
          this.editMode=false;
        this.form.reset();
        $("#addNew").modal("show");
        },
    loadUsers() {
      axios.get("api/user").then(({ data }) => (this.users = data.data));
    },
    createUser() {
      this.$Progress.start();
      this.form
        .post("api/user")
        .then(() => {
          $("#addNew").modal("hide");
          this.$Progress.finish();

          Fire.$emit('AfterCreate');
          toast({
            type: "success",
            title: "User Created"
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    },
//start
deleteUser(id){
  swal({
    title: 'Are you sure?',
    text:"You wont be able to rvert this",
    type:'warning',
    showCancelButton:true,
    confirmButtonColor:'#3085d6',
    cancelButtonColor:'#d33',
    confirmButtonText:'Yes,delete it!'
  }).then((cancel)=>{
    //send the request to server
    this.form.delete('api/user/'+id).then(()=>{
      swal(
        'Deleted!',
        'Your file has been deleted',
        'success'
    )
     Fire.$emit('AfterCreate');
    }).catch(()=>{
      swal("Failed","There was an eror", "warning");
    });
  })}
},
  //end
  created() {
    this.loadUsers();
    Fire.$on("AfterCreate", () => {
      this.loadUsers();
    });
  }
};
</script>
 