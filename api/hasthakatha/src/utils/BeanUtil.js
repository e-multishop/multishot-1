module.exports = class BeanUtil {
    static getCategoryIDFromName(categoryList, name) {
        const match = categoryList.filter(c => c.name === name);
        return match && match.length > 0 ? match[0].cid : -1;
    }
}