interface User {
    id:number | string,
    name:string
    array?: Calle[]
}

interface Calle {
    calle: string,
    numero: number
}

type Calle2 {
    calle: string,
    numero: number
}




undefined


class A{
     id:number;
    private class: B;
    users: User[] = [
        {id:45, name:'sas', array: [{calle:'',numero:45}]},
        {id:90, name:'sas'},
    ];

    metodo(){
        this.class.id2;
        this.class.metodoB();
    }
}

class B {
    public id2:number;
    metodoB(param:number,param:number,param:user){

    }
}
