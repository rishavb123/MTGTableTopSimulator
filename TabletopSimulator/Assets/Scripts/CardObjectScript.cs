using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class CardObjectScript : MonoBehaviour
{

    public string baseUrl = "https://api.scryfall.com/cards/named";

    //public string url = "https://img.scryfall.com/cards/large/front/6/d/6da045f8-6278-4c84-9d39-025adf0789c1.jpg?1562404626";
    public string cardName = "Reclaim";

    void Start()
    {
        StartCoroutine(GetCardData());
    }

    private IEnumerator GetCardData()
    {
        string url = baseUrl + "?exact=" + cardName;
        UnityWebRequest request = UnityWebRequest.Get(url);
        yield return request.SendWebRequest();

        //Card card = JsonUtility.FromJson<Card>(request.downloadHandler.text);
        
    }

    private IEnumerator GetTexture(string imageUrl)
    {
    
        UnityWebRequest www = UnityWebRequestTexture.GetTexture(imageUrl);
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Texture myTexture = ((DownloadHandlerTexture)www.downloadHandler).texture;
            gameObject.GetComponent<MeshRenderer>().material.mainTexture = myTexture;
        }
    }
}
