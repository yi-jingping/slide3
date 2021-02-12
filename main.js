$imgs = $('.imgs')
var firstCopy = $('.imgs img:first').clone(true)
var lastCopy = $('.imgs img:last').clone(true)
$imgs.append(firstCopy).prepend(lastCopy)

var timerId
var index = 1
var $arrows = $('.arrows')
var $selections = $('.selections')
$('.selections div').eq(0).addClass('active')

$selections.on('click','div',function(e){
    index = $(e.currentTarget).index() + 1
    playIndex()
    $selections.children().removeClass('active')
    $(e.currentTarget).addClass('active')
})

autoPlay()
document.addEventListener('visibilitychange', function () {
  // 用户离开了当前页面
  if (document.visibilityState === 'hidden') {
    window.clearInterval(timerId)
  }
  // 用户打开或回到页面
  if (document.visibilityState === 'visible') {
    autoPlay()
  }
})


$('.arrows>.next').on('click',function(){
    playNext()
})
$('.arrows>.previous').on('click',function(){
    index -=1
    if(index > 0){
        playIndex()
    }else if(index === 0){
        playIndex()
        $imgs.one('transitionend',function(){
            $imgs.hide().offset()
            index = 4
            playIndex()
            $imgs.show()
        })
    }
})

function playNext(){
    index +=1
    if(index < 5){
        playIndex()
    }else if(index === 5){
        playIndex()
        $imgs.one('transitionend',function(){
            $imgs.hide().offset()
            index = 1
            playIndex()
            $imgs.show()
        })
    }else{
        return false
    }
}

function playIndex(){
    $imgs.css({'transform':'translateX(' + (-300*index) + 'px)'})
    $selections.children().removeClass('active')
    let p = index
    if(p > 4){
        p = 1
    }else if(p < 1){
        p = 4
    }
    $(`.selections > div:nth-child(${p})`).addClass('active')

}
function autoPlay(){
    timerId = setInterval(function(){
        playNext()

    },3000)
}