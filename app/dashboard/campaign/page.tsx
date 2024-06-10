"use client";

import { useState, useEffect } from 'react';
import { Campaign, DateDetails } from '@/types';
import { getCampaigns } from '@/services/campaign.service';

export default function Page() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Campaign>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleEdit = (index: number) => {
    const campaign = campaigns[index];
    if (campaign) {
      setEditIdx(index);
      setFormData(campaign);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, dateType: 'startDate' | 'endDate', field: keyof DateDetails) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [dateType]: {
        ...prev[dateType],
        [field]: Number(value),
      }
    }));
  };

  const handleSave = () => {
    if (editIdx !== null) {
      const updatedCampaigns = [...campaigns];
      updatedCampaigns[editIdx] = formData as Campaign;
      setCampaigns(updatedCampaigns);
      setEditIdx(null);
    }
  };

  const handleCancel = () => {
    setEditIdx(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Campaign Page</h1>
      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-between mt-6 mb-4">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none focus:ring"
          />
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700">
            Search
          </button>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Campaign ID</th>
                    <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Campaign Name</th>
                    <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">University ID</th>
                    <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">University Name</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">StartDate</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">EndDate</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                    <th className="relative py-3.5 px-4"><span className="sr-only">Edit</span></th>
                    <th className="relative py-3.5 px-4"><span className="sr-only">Delete</span></th>
                    <th className="relative py-3.5 px-4"><span className="sr-only">Bookmark</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {filteredCampaigns.map((campaign, index) => (
                    <tr key={campaign.campaignId}>
                      <td className="px-20 py-4 text-sm font-medium whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="campaignId"
                            value={formData.campaignId || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">{campaign.campaignId}</h2>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="campaignName"
                            value={formData.campaignName || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{campaign.campaignName}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-20 py-4 text-sm font-medium whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="universityId"
                            value={formData.universityId || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">{campaign.universityId}</h2>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="universityName"
                            value={formData.universityName || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{campaign.universityName}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">
                        {editIdx === index ? (
                          <>
                            <input
                              type="number"
                              name="startDateYear"
                              value={formData.startDate?.year || ''}
                              onChange={(e) => handleDateChange(e, 'startDate', 'year')}
                              placeholder="Year"
                              className="text-gray-700 dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="startDateMonth"
                              value={formData.startDate?.month || ''}
                              onChange={(e) => handleDateChange(e, 'startDate', 'month')}
                              placeholder="Month"
                              className="text-gray-700 dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="startDateDay"
                              value={formData.startDate?.day || ''}
                              onChange={(e) => handleDateChange(e, 'startDate', 'day')}
                              placeholder="Day"
                              className="text-gray-700 dark:text-gray-200"
                            />
                          </>
                        ) : (
                          <div>{`${campaign.startDate.year}-${campaign.startDate.month}-${campaign.startDate.day}`}</div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">
                        {editIdx === index ? (
                          <>
                            <input
                              type="number"
                              name="endDateYear"
                              value={formData.endDate?.year || ''}
                              onChange={(e) => handleDateChange(e, 'endDate', 'year')}
                              placeholder="Year"
                              className="text-gray-700 dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="endDateMonth"
                              value={formData.endDate?.month || ''}
                              onChange={(e) => handleDateChange(e, 'endDate', 'month')}
                              placeholder="Month"
                              className="text-gray-700 dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="endDateDay"
                              value={formData.endDate?.day || ''}
                              onChange={(e) => handleDateChange(e, 'endDate', 'day')}
                              placeholder="Day"
                              className="text-gray-700 dark:text-gray-200"
                            />
                          </>
                        ) : (
                          <div>{`${campaign.endDate.year}-${campaign.endDate.month}-${campaign.endDate.day}`}</div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{campaign.status}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <button onClick={handleSave} className="text-green-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-green-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </button>
                        ) : (
                          <button onClick={() => handleEdit(index)} className="text-gray-500 transition-colors duration-200 dark:hover:text-blue-500 dark:text-gray-300 hover:text-blue-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l2.65 2.65a1 1 0 010 1.414L8.93 19.133l-3.39.632a1 1 0 01-1.186-1.186l.632-3.39L16.862 4.487zM19.882 2.464a2 2 0 00-2.828 0l-.878.878a1 1 0 101.414 1.414l.878-.878a2 2 0 000-2.828z" />
                            </svg>
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.11 48.11 0 00-7.5 0" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M16.5 2.25c.621 0 1.207.247 1.643.682.435.436.682 1.022.682 1.643v15.75a.75.75 0 01-1.28.53l-5.22-5.22-5.22 5.22a.75.75 0 01-1.28-.53V4.575c0-.621.247-1.207.682-1.643.436-.435 1.022-.682 1.643-.682h7.35zm0 1.5h-7.35c-.276 0-.54.11-.734.305a1.037 1.037 0 00-.305.734v13.19l4.47-4.47a.75.75 0 011.06 0l4.47 4.47V4.79c0-.276-.11-.54-.305-.734a1.037 1.037 0 00-.734-.305z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
            Previous
          </button>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
              1
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
              2
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
              3
            </button>
          </div>
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
            Next
          </button>
        </div>
      </section>
    </>
  );
}
