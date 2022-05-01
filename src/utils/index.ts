/**
 * 判断js资源是否有效
 * @param url
 * @returns
 */
export async function CheckStatus(url: string) {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
