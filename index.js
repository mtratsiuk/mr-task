;(function () {
    "use strict"

    window.addEventListener("DOMContentLoaded", init)

    function init() {
        var $emailsInput = document.querySelector("[data-id='d-emails-input']")
        var $addEmailButton = document.querySelector("[data-id='d-add-email']")
        var $getEmailsCountButton = document.querySelector("[data-id='d-get-emails-count']")

        var emailsInput = window.mrEmailsInput.render($emailsInput)

        $getEmailsCountButton.addEventListener("click", function () {
            alert(emailsInput.getAll().length)
        })

        $addEmailButton.addEventListener("click", function () {
            emailsInput.add(getRandomEmail())
        })
    }

    var lastNames = ["stone", "stanbrige", "mel", "and", "sim", "anderson"]
    var firstNames = ["john", "mia", "d", "h", "ang", "pon"]
    var domains = ["gm.com", "live.com", "at.io", "mail.ru", "protonmail.com"]

    function getRandomEmail() {
        return pick(firstNames) + "." + pick(lastNames) + "@" + pick(domains)
    }

    function random(from, to) {
        return Math.round((to - from) * Math.random() + from)
    }

    function pick(array) {
        return array[random(0, array.length - 1)]
    }
})()
