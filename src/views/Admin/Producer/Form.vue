<template>
    <div class="card  w-75 mt-5 py-3 px-5 mx-auto">
        <h3 class="mx-auto my-3 pb-2">Nhà sản xuất</h3>
        <form @submit.prevent="save()">
            <div class="form-group">
                <label class="h6">Tên nhà sản xuất:</label>
                <input type="text" v-model="producer.name" class="form-control">
            </div>
            <div class="form-group mt-3">
                <label class="h6">Số điện thoại:</label>
                <input type="text" v-model="producer.phone" class="form-control">
            </div>
            <div class="form-group my-3">
                <label class="h6">Email:</label>
                <input type="text" v-model="producer.email" class="form-control">
            </div>

            <button className='btn btn-success' type="submit" >Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
       
        </form>
    
    
        
     </div>
</template>

<script>
import axios from 'axios';
export default{
    name: 'ProducerForm',
    data(){
        return{
            errors:{
                name:'',
                phone: '',
                email: ''
            },
            producer:{
                name:'',
                phone: '',
                email: ''
            }
        }
    },
    created(){
        let producerID = this.$route.params.id;
        if(producerID){
            this.getProducer(producerID);
        }
    },
    methods:{
        validate(){

        },
        save(){
            if(this.producer.id){
                axios.put(`producers/${this.producer.id}`, this.producer).then(res=>{
                    if(res.data.success){
                        this.$router.push({name: 'producers'});
                        this.$swal.fire('Đã sửa thành công!','','success');
                    }
                });
            } 
            else 
            {
                axios.post('producers', this.producer).then(res=>{
                    this.$router.push({name: 'producers'})
                        this.$swal.fire('Đã thêm thành công!','','success');
                });
                
            }

        },
        getProducer(producerID){
            axios.get(`producers/${producerID}`).then(res=>{
                this.producer = res.data
            });
        },
    }
}
</script>