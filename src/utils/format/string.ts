const camelizeRE = /-(\w)/g

/**
 * 將傳入的字串中 "-" 與其後一個的文字改為大寫, 方便將文字改為駝峰式
 * ex: 
 * 1. pull-refresh => pullRefresh
 * 2. fake-vant-contact-card => fakeVanContactCard
 */
export function camelize(str: string): string {
    return str.replace(camelizeRE,(_,c)=>c.toUpperCase())
}