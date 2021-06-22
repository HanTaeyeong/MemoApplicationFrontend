import { getItem, setItem, removeItem } from "../../lib/localStorageRequest";

describe("localStorage test", () => {
  it("setItem", () => {
    setItem("username", "gksxodud");
    expect(getItem("username")).toEqual("gksxodud");
  });
  it("removeItem", () => {
    setItem("username", "gksxodud");
    expect(getItem("username")).toEqual("gksxodud");
    removeItem("username");
    expect(getItem("username")).toBe("");
  });
  it("localstorage with nothing should returne empty string", () => {
    const res = getItem("should return empty string 35fjeifd9fe");
    expect(res).toBe("");
  });
  it("localStorageRequest should encrypt value well", () => {
    const text = "first encrypted";
    setItem("tyty", text);
    const stolenText = localStorage.getItem("tyty");
    expect(stolenText).not.toEqual(text);
    
    const decryptedText = getItem("tyty");
    expect(decryptedText).toEqual(text);
  });
});
