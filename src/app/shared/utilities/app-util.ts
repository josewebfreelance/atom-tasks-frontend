export class AppUtil {

  public static setStorageValue(key: string, value: any): void {
    localStorage.setItem(key, value.toString());
  }

  public static getStorageValue(key: string): string | null {
    return localStorage.getItem(key);
  }

}
