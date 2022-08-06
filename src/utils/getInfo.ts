export default async function getInfo(link: string) {
  const res = await fetch(
    `https://www2.cs.ccu.edu.tw/~lyc109u/fetch/meta.php?link=${link}`
  );
  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    return null;
  }
}
