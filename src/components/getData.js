import ajax from '@/utils/ajax'

ajax('get','./static/data/test_data.json','',function(data){
    console.log(JSON.parse(data));
});