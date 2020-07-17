//<![CDATA[
String.format=function(a){
  if(arguments.length<=1)return a
  var c=arguments.length-2;
  for(var b=0;b<=c;b++)a=a.replace(new RegExp("\\{"+b+"\\}","gi"),arguments[b+1])
  return a
}
window.addEventListener('load',function(){
  function loadweather(codeid){
    $.ajax({
      url:'https://utils1.cnnd.vn/APIWeather.ashx',
      async:false,
      success:function(response){
        if(response!==''){
          var data=JSON.parse(response)
          for(var i=0;i<data.length;i++){
            if(data[i].CodeID==codeid){
              $('.boxinfo .weather .temperature').html(data[i].Temperature+"°C / <span class='range'>" +data[i].low1+"°C - "+ data[i].hight1+"°C"+"</span>")
              switch (data[i].temp1){
                case "mưa rào":
                  $('.boxinfo .weather .spriteweather').remove()
                  $('.boxinfo .weather').append('<span class="spriteweather cobao"></span>')
                  break;
                case "mây":
                case "trời nhiều mây":
                case "thỉnh thoảng trời nhiều mây":
                  $('.boxinfo .weather .spriteweather').remove()
                  $('.boxinfo .weather').append('<span class="spriteweather nhieumay"></span>')
                  break;
                case "mưa":
                case "mưa giông":
                case "rải rác có mưa":
                case "rải rác có mưa giông":
                  $('.boxinfo .weather .spriteweather').remove()
                  $('.boxinfo .weather').append('<span class="spriteweather muagiong"></span>')
                  break;
                case "trời nắng to":
                case "trời nhiều nắng":
                  $('.boxinfo .weather .spriteweather').remove()
                  $('.boxinfo .weather').append('<span class="spriteweather nangto"></span>')
                  break;
                default:
                  $('.boxinfo .weather .spriteweather').remove()
                  $('.boxinfo .weather').append('<span class="spriteweather troidep"></span>')
                  break
              }
            }
          }
        }
      }
    })
  }
  function loadApiCafef(){
    var formatItem='<li>'+'<p class="name">{0}</p>'+'<p class="price">{1}</p>'+'<p class="change{3}">{2}</p>'+'</li>'
    var htmlTygia=''
    $.ajax({
      url:'https://solieu5.mediacdn.vn/Ajax/exchange.ashx',
      success:function(data){
        var response=JSON.parse(data)
        for(var i=0;i<response.length;i++){
          if(response[i].ProductName!='Vàng TG(USD)'){
            var change=((parseFloat(response[i].CurrentPrice)-parseFloat(response[i].PrevPrice))/parseFloat(response[i].PrevPrice))*100
            var addClassChange=''
            if(change==0)addClassChange=' balance'
            else if(change<0)addClassChange=' down'
            htmlTygia+=String.format(formatItem,response[i].ProductName,
            response[i].CurrentPrice.toLocaleString(),
            change.toFixed(2)+'%',
            addClassChange)
          }
        }
        htmlTygia+='<li><p class="origin">Nguồn: Eximbank,SJC</p></li>'
        $('.tygia ul').html(htmlTygia)
      }
    })
    var htmlChungKhoan=''
    $.ajax({
      url:'https://solieu5.mediacdn.vn/Ajax/indexes.ashx',
      success:function(data){
        var response=JSON.parse(data)
        for(var i=0;i<response.length;i++){
          var addClassChange=''
          if(parseFloat(response[i].IndexPercent)==0)addClassChange=' balance'
          else if(parseFloat(response[i].IndexPercent)<0)addClassChange=' down'
          htmlChungKhoan+=String.format(formatItem,response[i].CenterTitle+'-Index',
          response[i].Index.toLocaleString(),
          response[i].IndexPercent+'%',
          addClassChange)                 
        }
        $('.chungkhoan ul').html(htmlChungKhoan)
      }
    })
  }
  $('.location').click(function() {
    $(this).find('.iconmuiten').toggleClass('show')
    $('.selectlocation').toggleClass('show')
  })
  $('.myplace').click(function() {
    var codeid=$(this).data('codeid')
    loadweather(codeid)
    $('.location').html('<span class="iconmuiten"></span>'+$(this).data('name'))
    $('.selectlocation').toggleClass('show')
  })
  loadweather(2347727);loadApiCafef()
})
//]]>
