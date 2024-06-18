subdomain = window.location.host.split(".")[0]

if (subdomain == "map") {
    window.location.href = "./map/"
}

if (subdomain == "mwi") {
    window.location.href = "./mwi/"
}