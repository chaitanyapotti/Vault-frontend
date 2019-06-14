const formatAddress = address => {
    if (!address || address===""){
        return ""
    }

    return address.substr(0, 6) + "..." + address.substr(address.length-3, 3)

};

export {
    formatAddress
}