function pos_receipt(instance, module) { //module is instance.point_of_sale
    var module = instance.point_of_sale;
    var QWeb = instance.web.qweb;
    _t = instance.web._t;
    //var pos_order = null;
   /* models: [
            { model:  'pos.order',
               fields: ['name'],
               //domain: [['pos_reference','=','number']],
               loaded: function(self,partners){
                 self.pos_order= partners[0]; 
                    //self.db.generateOrderName(partners);
                  },
             },      ],*/

    var lineNew = module.Paymentline;
    console.log("lineNewwwwwww",lineNew);
    module.Paymentline = module.Paymentline.extend({
        get_cash:function(str){
            if (str == 'cash'){
                return _t('Cash')
            }
        },
    });

    var Ordersuper = module.Order;
    module.Order = module.Order.extend({
        initialize: function(attributes){
        	var res = Ordersuper.prototype.initialize.call(this, attributes);
        	this.pos = attributes.pos; 
            //this.name =  this.generateUniqueId();
        	this.uid =  this.generateUniqueId();
        	this.set({
        		name: this.uid,
        	});
            return res;
        },
        generateUniqueId: function() {
            function zero_pad(num,size){
                var s = ""+num;
                while (s.length < size) {
                    s = "0" + s;
                }
                return s;
            }
            return zero_pad(this.pos.pos_session.id,5) +'-'+
                   zero_pad(this.pos.pos_session.login_number,3) +'-'+
                   zero_pad(this.sequence_number,4);
        },

// Create New Method For Getting Order Name in Front-End side...!!!
    /*    initialize: function(attributes){
        	var res = Ordersuper.prototype.initialize.call(this, attributes);
            var number;
        	this.pos = attributes.pos; 
            this.order_name =  this.generateOrderName();
        	this.set({
        		name2: this.order_name,
        	});
            return res;
        },
        generateOrderName: function() {
            function order_pad(num,size){
                var s = ""+num;
                while (s.length < size) {
                    s = "0" + s;
                }
                return s;
            }
                var number = order_pad("") +'Main/'+ order_pad(this.sequence_number+1,4);
          
            return number;
           },  */
//create a name
         initialize: function(attributes){
        	var res = Ordersuper.prototype.initialize.call(this, attributes);
            //this.name1 = this.pos.pos_order.name;
            var number;
        	this.pos = attributes.pos; 
            this.order_name =  this.generateOrderNum();
        	this.set({
        		name2: this.order_name,
        	});
            
            return res;
        },

         generateOrderNum: function() {
           function order_pad(num,size){
                var s = ""+num;
                while (s.length < size) {
                    s = "0" + s;
                }
                return s;
            }
                //var number = order_pad("") +'Main/'+ order_pad(this.sequence_number+3,4);
                var num_in_string = this.pos.pos_order.name;
                console.log("++++++++++++++num_in_string+++++++",num_in_string);
                var alag = num_in_string.split("/");
                
                console.log("&&&&&&&&&&& alag &&&&&&&&&",alag);
                //var athemare = alag.split("/");
                console.log("++++++++++++++alag[1]+++++++",alag[1]);
                var final_number = alag[1];
                console.log("----------------------",final_number);
                var n =  parseInt("final_number");
                console.log("kkkkkkkkkkkkkkkkkkkkkkkkkknnnnnnn",n);
                
           // return order_pad(n);
           var latest_number = order_pad("") +'Main/'+ order_pad(parseInt(alag[1])+1,4);
            return latest_number;
            

           },
         

    });

 

    var PosModelSuperReceipt = module.PosModel;
    module.PosModel = module.PosModel.extend({
        load_server_data: function() {
            var self = this;
            self.models[1]['fields'].push('logo');
            self.models[1]['fields'].push('nname');
            return PosModelSuperReceipt.prototype.load_server_data.call(this);
        },
    });

    module.ReceiptScreenWidget.include({
		refresh: function() {
            var order = this.pos.get('selectedOrder');
            console.log('herrrrr     order',order);
            console.log('herrrrr',self.posmodel);
            $('.pos-receipt-container', this.$el).html(QWeb.render('PosTicket',{
                    widget:this,
                    
                    logo:self.posmodel.company_logo.src,
                    nname:self.posmodel.pos_order,
                    order: order,
                    //name: self.posmodel.name,
                    orderlines: order.get('orderLines').models,
                    paymentlines: order.get('paymentLines').models,
           	}));

        },
    });



};

openerp.pos_receipt_extended = function(instance) {
var module = instance.point_of_sale;
pos_receipt(instance,module);
};
