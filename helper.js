module.exports = {
    getHoistedOption: (interaction, name) => {
        return (interaction?.options?._hoistedOptions || []).find(x=>x.name == name)
    }
}