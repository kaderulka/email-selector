import React, { useState } from 'react';

interface Recipient {
  id: number;
  name: string;
  email: string;
  type?: 'company' | 'email'; 
}

const EmailSelector: React.FC = () => {
  const [availableRecipients, setAvailableRecipients] = useState<Recipient[]>([
    { id: 5, name: 'Muhammed', email: 'muhammed@gmail.com', type: 'email' },
    { id: 6, name: 'Uğur', email: 'ugur@gmail.com', type: 'email' },
    { id: 7, name: 'Furkan', email: 'furkan@gmail.com', type: 'email' },
    { id: 8, name: 'Hilal', email: 'hilal@gmail.com', type: 'email' },
  ]);

  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPosteffectEmails, setShowPosteffectEmails] = useState<boolean>(false);
  const [showCompanyRecipients, setShowCompanyRecipients] = useState<boolean>(true);
  const [showEmailRecipients, setShowEmailRecipients] = useState<boolean>(true);

  const posteffectRecipients: Recipient[] = [
    { id: 1, name: 'Mehmet', email: 'mehmet@posteffect.ai', type: 'company' },
    { id: 2, name: 'Mert', email: 'mert@posteffect.ai', type: 'company' },
    { id: 3, name: 'Natali', email: 'natali@posteffect.ai', type: 'company' },
    { id: 4, name: 'Hilal', email: 'hilal@posteffect.ai', type: 'company' },
  ];

  const filteredRecipients = availableRecipients.filter((recipient) =>
    recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRecipient = (recipient: Recipient) => {
    setAvailableRecipients(availableRecipients.filter(r => r.id !== recipient.id));
    setSelectedRecipients([...selectedRecipients, recipient]);
  };

  const handleRemoveRecipient = (recipient: Recipient) => {
    setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipient.id));
    setAvailableRecipients([...availableRecipients, recipient]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const togglePosteffectEmails = () => {
    setShowPosteffectEmails(!showPosteffectEmails);
  };

  const handleAddPosteffectRecipients = () => {
    const newSelectedRecipients = posteffectRecipients.filter(
      recipient => !selectedRecipients.some(r => r.email === recipient.email)
    );
    setAvailableRecipients(availableRecipients.filter(
      recipient => !posteffectRecipients.some(p => p.email === recipient.email)
    ));
    setSelectedRecipients([...selectedRecipients, ...newSelectedRecipients]);
  };

  const companyRecipients = selectedRecipients.filter(recipient => recipient.type === 'company');
  const emailRecipients = selectedRecipients.filter(recipient => recipient.type === 'email');

  const toggleCompanyRecipients = () => {
    setShowCompanyRecipients(!showCompanyRecipients);
  };

  const toggleEmailRecipients = () => {
    setShowEmailRecipients(!showEmailRecipients);
  };

  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <div style={{ marginLeft: '40px', marginRight: '1px', textAlign: 'left', position: 'relative', border: '1px solid #ccc', padding: '60px 100px 20px 100px', borderRadius: '20px', width: 'fit-content', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
        <h3 style={{ position: 'absolute', top: '-30px', left: '30px', color: 'blue', backgroundColor: '#fff', padding: '0 70px', fontSize: '24px' }}>Available Recipients</h3>
        <input
          type="text"
          placeholder="🔍 Search"
          value={searchTerm}
          onChange={handleSearch}
          style={{ textAlign: 'left', marginBottom: '35px', padding: '10px', width: '200px', border: '1px solid #ccc', borderRadius: '10px' }}
        />
        <div>
          <h3
            style={{ textAlign: 'left', border: '1px solid #ccc', padding: '20px', paddingRight: '215px', borderRadius: '20px', width: 'fit-content', cursor: 'pointer', fontSize: '15px', fontWeight: 'normal', margin: '0', borderBottom: '1px solid #ccc', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomRightRadius: '1px', borderBottomLeftRadius: '8px' }}
            onClick={togglePosteffectEmails}
          >
            {showPosteffectEmails ? '▼' : '▲'} Posteffect.ai
          </h3>
          {showPosteffectEmails && (
            <div style={{ textAlign: 'left', marginBottom: '15px', marginLeft: '40px', marginRight: '1px', padding: '20px', border: '1px solid #ccc', borderTop: '1px solid #ccc', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
              {posteffectRecipients.map(recipient => (
                <span
                  key={recipient.id}
                  style={{ marginBottom: '15px', textAlign: 'left', cursor: 'pointer', display: 'block', padding: '5px 0' }}
                  onClick={() => handleAddRecipient(recipient)}
                >
                  {recipient.email}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          {filteredRecipients.map(recipient => (
            <div key={recipient.id} style={{ textAlign: 'left', marginBottom: '20px' }}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleAddRecipient(recipient)}
              >
                {recipient.email}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginLeft: '40px', marginRight: '1px', textAlign: 'left', position: 'relative', border: '1px solid #ccc', padding: '50px 100px 20px 100px', borderRadius: '20px', width: 'fit-content', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
        <h3 style={{ position: 'absolute', top: '-30px', left: '30px', color: 'blue', backgroundColor: '#fff', padding: '0 70px', fontSize: '24px' }}>Selected Recipients</h3>
        <div style={{ marginBottom: '300px', marginTop: '20px' }}>
          <h4
            style={{ marginBottom: '30px', textAlign: 'left', border: '1px solid #ccc', padding: '20px', paddingRight: '170px', borderRadius: '20px', width: 'fit-content', cursor: 'pointer', fontSize: '15px', fontWeight: 'normal', margin: '0', borderBottom: '1px solid #ccc', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomRightRadius: '1px', borderBottomLeftRadius: '8px' }}
            onClick={toggleCompanyRecipients}
          >
            {showCompanyRecipients ? '▼' : '▲'} Company Recipients
          </h4>
          {showCompanyRecipients && (
            <div style={{ marginBottom: '20px' }}>
              {companyRecipients.length > 0 ? (
                companyRecipients.map(recipient => (
                  <div key={recipient.id} style={{ marginBottom: '10px' }}>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRemoveRecipient(recipient)}
                    >
                      {recipient.name}
                    </span>
                  </div>
                ))
              ) : (
                <p>No company recipients selected.</p>
              )}
            </div>
          )}
          
          <h4
            style={{ textAlign: 'left', border: '1px solid #ccc', padding: '20px', paddingRight: '198px', borderRadius: '20px', width: 'fit-content', cursor: 'pointer', fontSize: '15px', fontWeight: 'normal', margin: '0', borderBottom: '1px solid #ccc', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomRightRadius: '1px', borderBottomLeftRadius: '8px' }}
            onClick={toggleEmailRecipients}
          >
            {showEmailRecipients ? '▼' : '▲'} Email Recipients
          </h4>
          {showEmailRecipients && (
            <div>
              {emailRecipients.length > 0 ? (
                emailRecipients.map(recipient => (
                  <div key={recipient.id} style={{ marginBottom: '10px' }}>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRemoveRecipient(recipient)}
                    >
                      {recipient.email}
                    </span>
                  </div>
                ))
              ) : (
                <p>No email recipients selected.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSelector;
