window.showBack = ->
    dizmo.showBack()
    return

window.showFront = ->
    dizmo.showFront()
    return

window.i18n (err, t) ->
    cell = document.getElementsByClassName('table-cell')[0]
    cell.textContent = t '#front/greeting'
    done = document.getElementById 'done'
    done.textContent = t '#back/done'
    return

window.document.addEventListener 'dizmoready', ->
    document.getElementById('done').onclick = ->
        dizmo.showFront()
        return
    return
, {
    once: true
}
