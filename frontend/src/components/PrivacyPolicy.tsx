import React from 'react'
import { css } from '@emotion/react'


const Styles = {
  ContainerStyle: css ({
    maxWidth: '1400px',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
}


const PrivacyPolicy = () => {

  return (
    <div css={Styles.ContainerStyle}>
      <div className='mb-6'>
        <h1 className='font-bold  text-gray-900 sm:text-2xl text-center'>プライバシーポリシー</h1>
      </div>
      <div className='indent-3'>
        PhotoSpace 運営（以下、「当社」といいます。）が本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      </div>
      <div className='mt-2'>
        <p>１．お客様から取得する情報</p>
        <ul className='indent-3 list-disc list-inside'>
          当社は、お客様から以下の情報を取得します。
          <li>
            ⽒名(ニックネームやペンネームも含む)
          </li>
          <li>
            メールアドレス
          </li>
          <li>
            写真や動画
          </li>
          <li>
            Cookie(クッキー)を⽤いて⽣成された識別情報
          </li>
          <li>
            お客様の位置情報
          </li>
        </ul>
      </div>
      <div className='mt-2'>
        <p>２．お客様の情報を利⽤する⽬的</p>
        <ul className='indent-3 list-disc list-inside'>
          当社は、お客様から取得した情報を、以下の⽬的のために利⽤します。
          <li>
            当社サービスに関する登録の受付、お客様の本⼈確認、認証のため
          </li>
          <li>
            お客様の当社サービスの利⽤履歴を管理するため
          </li>
          <li>
            当社サービスにおけるお客様の⾏動履歴を分析し、当社サービスの維持改善に役⽴てるため
          </li>
          <li>
            広告の配信、表⽰及び効果測定のため
          </li>
          <li>
            お客様の趣味嗜好にあわせたターゲティング広告を表⽰するため
          </li>
          <li>
            当社のサービスに関するご案内をするため
          </li>
          <li>
            お客様からのお問い合わせに対応するため
          </li>
          <li>
            当社の規約や法令に違反する⾏為に対応するため
          </li>
          <li>
            当社サービスの変更、提供中⽌、終了、契約解除をご連絡するため
          </li>
          <li>
            当社規約の変更等を通知するため
          </li>
          <li>
            以上の他、当社サービスの提供、維持、保護及び改善のため
          </li>
        </ul>
      </div>
      <div className='mt-2' >
        <p>３．安全管理のために講じた措置</p>
        <p className='indent-3'>当社が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきまし たら、法令の定めに従い個別にご回答させていただきます。</p>
      </div>
      <div className='mt-2' >
        <p>４．第三者提供</p>
        <p className='indent-3'>当社は、お客様から取得する情報のうち、個⼈データ（個⼈情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意 を得ずに、第三者（⽇本国外にある者を含みます。）に提供しません。。</p>
        <ul className='indent-3 list-disc list-inside'>
          但し、次の場合は除きます。
          <li>
            個⼈データの取扱いを外部に委託する場合
          </li>
          <li>
            当社や当社サービスが買収された場合
          </li>
          <li>
            事業パートナーと共同利⽤する場合（具体的な共同利⽤がある場合は、その内容を別途公表します。）
          </li>
          <li>
            その他、法律によって合法的に第三者提供が許されている場合
          </li>
        </ul>
      </div>
      <div className='mt-2' >
        <p>５．アクセス解析ツール</p>
        <p className='indent-3'>当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利⽤しています。Googleアナリティクスは、トラフィックデータの収 集のためにCookieを使⽤しています。トラフィックデータは匿名で収集されており、個⼈を特定するものではありません。Cookieを無効にす れば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについ て、詳しくは以下からご確認ください。 
        <a href='https://marketingplatform.google.com/about/analytics/terms/jp/'>https://marketingplatform.google.com/about/analytics/terms/jp/</a></p>
      </div>
      <div className='mt-2' >
        <p>６．プライバシーポリシーの変更</p>
        <p className='indent-3'>当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施⾏時期と内容を適切 な⽅法により周知または通知します。</p>
      </div>
      <div className='mt-2' >
        <p>７．お問い合わせ</p>
        <p className='indent-3'>お客様の情報の開⽰、情報の訂正、利⽤停⽌、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
e-mail
zwei328@gmail.com
この場合、必ず、運転免許証のご提⽰等当社が指定する⽅法により、ご本⼈からのご請求であることの確認をさせていただきます。なお、情 報の開⽰請求については、開⽰の有無に関わらず、ご申請時に⼀件あたり1,000円の事務⼿数料を申し受けます。</p>
      </div>
      <div className='mt-2' >
        <p>8．事業者の⽒名</p>
        <p className='indent-3'>吉川 恭平</p>
      </div>
      <div className='mt-2' >
        <p>9．事業者の住所</p>
        <p className='indent-3'>群⾺県太⽥市⾼瀬町33-1</p>
      </div>
      <div className='mt-2' >
        <p className='i'>2023年09⽉12⽇ 制定</p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
