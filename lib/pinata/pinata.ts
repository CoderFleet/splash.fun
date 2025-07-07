export const pinFileToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: formData,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to upload file to IPFS");

  const cid = json.IpfsHash;
  return cid;
};
